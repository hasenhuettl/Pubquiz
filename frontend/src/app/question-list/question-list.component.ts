import { Component, OnInit } from '@angular/core';
import {Question, QuestionService} from "../services/question.service";
import {FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

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


  constructor(private questionService: QuestionService,
              private route: ActivatedRoute,
  ) {  }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe((response) => {
      //console.log({response})
      this.questions = response
      this.filteredQuestions = this.questions
    })

    this.filterFormControl.valueChanges.subscribe(value => this.filter(value));
    this.route.paramMap.subscribe(params => {
      this.filterFormControl.setValue(params.get('filter'))
    });
  }


  filter(filterValue: string) {
    if(this.route.snapshot.paramMap.get('id') != null){
      const id = this.route.snapshot.paramMap.get('id');
      this.filteredQuestions = this.questions.filter(a => {
        console.log(id)
        console.log(a.quiz.id)
        return (!filterValue || a.question_string.toLowerCase().includes(filterValue.toLowerCase())
                && a.quiz.id.toString() == id )
        }
      )
    }
    else {
      this.filteredQuestions = this.questions.filter(a => {
        return !filterValue || a.question_string.toLowerCase().includes(filterValue.toLowerCase())
      }
      )
    }
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
