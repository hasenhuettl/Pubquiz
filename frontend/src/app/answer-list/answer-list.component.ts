import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Answer, AnswerService} from "../services/answer.service";
import {ActivatedRoute} from "@angular/router";
import {Question} from "../services/question.service";


@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss']
})
export class AnswerListComponent implements OnInit {

  displayedColumns = ['id', 'user_answer', 'edit', 'delete'];
  answers: Answer[] = [];
  answer: Answer | undefined;
  filteredAnswers: Answer[] = [];
  id = '';
  quiz_id = '';

  question: any | Question = {};

  constructor(private answerService: AnswerService,
              private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') != null) {
      this.id = this.route.snapshot.paramMap.get('id')!;
    }

    this.answerService.getAnswers().subscribe((response) => {
      this.answers = response
      this.filter(this.question.user_answer)
      this.answer = this.answers[0]
      this.quiz_id = this.answer.question.quiz.id.toString()
    })

  }

  filter(filterValue: string) {
    if (this.id != '') {
      this.filteredAnswers = this.answers.filter(a => {
          return (a.question.id.toString() == this.id)
        }
      )
    } else {
      this.filteredAnswers = this.answers.filter(a => {
          return !filterValue || a.user_answer.toLowerCase().includes(filterValue.toLowerCase())
        }
      )
    }
    console.log(this.filteredAnswers)
  }

  deleteAnswer(answer: Answer) {
    this.answerService.deleteAnswer(answer).subscribe(() => {
      this.ngOnInit()
    });//?
  }

  confirmDelete(answer: Answer) {
    if (confirm("Are you sure to delete" + answer.user_answer + "?")) {
      this.deleteAnswer(answer)
    }
  }

}
