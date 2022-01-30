import {Component, OnInit} from '@angular/core';
import {Question, QuestionService} from "../services/question.service";
import {FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  displayedColumns = ['id', 'question_string', 'master_answer', 'quiz', 'join', 'edit', 'delete'];
  questions: Question[] = [];
  filteredQuestions: Question[] = [];
  filterFormControl = new FormControl('');
  id = '';

  question: any | Question = {};

  constructor(private questionService: QuestionService,
              private route: ActivatedRoute,
              private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') != null) {
      this.id = this.route.snapshot.paramMap.get('id')!;
    }

    this.questionService.getQuestions().subscribe((response) => {

      this.questions = response
      this.filter(this.question.question_string);
    })
    this.filterFormControl.valueChanges.subscribe(value => this.filter(value));
    this.route.paramMap.subscribe(params => {
      this.filterFormControl.setValue(params.get('filter'))
    });
  }

  filter(filterValue: string) {
    if (this.id != '') {
      this.filteredQuestions = this.questions.filter(a => {
          return (!filterValue || a.question_string.toLowerCase().includes(filterValue.toLowerCase()))
            && (a.quiz.id.toString() == this.id)
        }
      )
    } else {
      this.filteredQuestions = this.questions.filter(a => {
          return !filterValue || a.question_string.toLowerCase().includes(filterValue.toLowerCase())
        }
      )
    }
  }

  isAllowed(user: string): boolean {
    return this.userService.isOwner(user) || this.userService.hasPermission('pubquiz.delete_quiz')
  }

  deleteQuestion(question: Question): void {
    this.questionService.deleteQuestion(question).subscribe(() => {
      this.ngOnInit()
    });
  }

  confirmDelete(question: Question) {
    if (confirm("Are you sure to delete '" + question.question_string + "'?")) {
      this.deleteQuestion(question)
    }
  }
}
