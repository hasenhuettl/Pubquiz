import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AnswerService} from "../services/answer.service";
import {UserService} from "../services/user.service";


@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.scss']
})
export class AnswerFormComponent implements OnInit {

  answerFormGroup: FormGroup
  submitButtonText = '';
  answer_id = '';
  question_id = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private answerService: AnswerService,
    private userService: UserService,
    private snackbar: MatSnackBar,
    ) {
    this.answerFormGroup = new FormGroup({
      id: new FormControl(),
      user_answer: new FormControl('', [Validators.required], [this.answerValidator()]),
      created_by_user: new FormControl(''),
      question: new FormControl(),
      is_true: new FormControl(false)
      }
    )
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.answer_id = this.route.snapshot.paramMap.get('id')!;
    }
    this.submitButtonText = 'Update';
    this.answerService.getAnswer(this.answer_id).subscribe(answer =>
    { this.answerFormGroup.patchValue(answer)
      this.question_id = this.answerFormGroup.controls['question'].value.id});
  }

  updateAnswer() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.answer_id = this.route.snapshot.paramMap.get('id')!;
    }
    if (this.answer_id) {
      console.log(this.answerFormGroup.value)
      this.question_id = this.answerFormGroup.controls['question'].value.id
      console.log(this.answerFormGroup.value)
      this.answerService.updateAnswer(this.answerFormGroup.value).subscribe(() => {
        this.snackbar.open('Answer updated successfully!', 'OK',{duration:3000})
      })
      this.router.navigate(['/answer-list/' +  this.question_id]);
    } else {
      console.log(this.answerFormGroup.value)
      console.log('no ID has been passed')
      this.snackbar.open('An error occurred!', 'OK',{duration:3000})
      this.router.navigate(['/index']);
    }
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
