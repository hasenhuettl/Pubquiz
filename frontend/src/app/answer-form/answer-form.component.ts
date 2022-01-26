import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AnswerService} from "../services/answer.service";


@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.scss']
})
export class AnswerFormComponent implements OnInit {

  answerFormGroup: FormGroup;
  submitButtonText = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private answerService: AnswerService,
    private snackbar: MatSnackBar
  ) {
    this.answerFormGroup = new FormGroup({
        id: new FormControl(null),
        user_answer: new FormControl(null),

      }
    )
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.submitButtonText = 'Update Answer';
      this.answerService.getAnswer(id).subscribe(answer => { this.answerFormGroup.patchValue(answer) });
    } else {
      this.submitButtonText = 'Save Answer';
    }

  }
  createOrUpdateAnswer() {

    const id = this.answerFormGroup.controls['id'].value
    if (id) {
      console.log(this.answerFormGroup.value)
      this.answerService.updateAnswer(this.answerFormGroup.value).subscribe(() => {
        this.snackbar.open('Answer updated successfully!', 'OK',{duration:3000})
      })
      this.router.navigate(['/question-list/'+id]);
    } else {
      console.log(this.answerFormGroup.value)
      this.answerService.createAnswer(this.answerFormGroup.value).subscribe(() => {
        this.snackbar.open('Answer created successfully!', 'OK',{duration:3000})
      })

      this.router.navigate(['/question-list/'+id]);
    }
  }
  /**nameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.answerService.getAnswers().pipe(map(quizzes => {
        const currentId = this.answerFormGroup.controls['id'].value;
        const currentName = this.answerFormGroup.controls['quiz_name'].value;
        const existingAnswer = quizzes.find(answer => answer.user_answer === currentName);
        return existingAnswer && existingAnswer.id !== currentId ? {nameAlreadyExists: true} : null
      }))
    }
  }**/
}
