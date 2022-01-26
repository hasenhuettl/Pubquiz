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
  id = '';

  question: any | Question = {};

  constructor(private questionService: QuestionService,
              private route: ActivatedRoute,
  ) {  }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('id') != null) {
      this.id = this.route.snapshot.paramMap.get('id')!;
    }

    this.questionService.getQuestions().subscribe((response) => {
      //console.log({response})
      this.questions = response
      this.filter(this.question.question_string);
    })
    this.filterFormControl.valueChanges.subscribe(value => this.filter(value));
    this.route.paramMap.subscribe(params => {
      this.filterFormControl.setValue(params.get('filter'))
    });
}

  filter(filterValue: string) {
    console.log()
    if(this.id != '') {
      this.filteredQuestions = this.questions.filter(a => {
        console.log(a)
        return (!filterValue || a.question_string.toLowerCase().includes(filterValue.toLowerCase()))
                && ( a.quiz.id.toString() == this.id )
        }
      )
    } else {
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
