import { Component, OnInit } from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AnswerService} from "../services/answer.service";

@Component({
  selector: 'app-answer-create',
  templateUrl: './answer-create.component.html',
  styleUrls: ['./answer-create.component.scss']
})
export class AnswerCreateComponent implements OnInit {

  answerFormGroup: FormGroup
  submitButtonText = '';
  question_id = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private answerService: AnswerService,
    private snackbar: MatSnackBar
  ) {
    this.answerFormGroup = new FormGroup({
        id: new FormControl(null),
        user_answer: new FormControl('', [Validators.required], [this.answerValidator()]),
        created_by_user: new FormControl(''),
        question: new FormControl(this.route.snapshot.paramMap.get('id'))
      }
    )
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.question_id = this.route.snapshot.paramMap.get('id')!;
    }
    this.submitButtonText = 'Create';
  }

  createAnswer() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.question_id = this.route.snapshot.paramMap.get('id')!;
    }
    console.log(this.answerFormGroup.value)
    this.answerService.createAnswer(this.answerFormGroup.value).subscribe(() => {
      this.snackbar.open('Answer created successfully!', 'OK', {duration: 3000})
    })
    this.router.navigate(['/answer-list/' + this.question_id]);
  }


  answerValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.answerService.getAnswers().pipe(map(answers => {
        const currentId = this.answerFormGroup.controls['id'].value;
        const currentAnswer = this.answerFormGroup.controls['user_answer'].value;
        const existingAnswer = answers.find(answer => answer.user_answer === currentAnswer);
        return existingAnswer && existingAnswer.id !== currentId ? {nameAlreadyExists: true} : null
      }))
    }
  }

}
