import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {QuizService} from "../services/quiz.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../services/user.service";


@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent implements OnInit {

  quizFormGroup: FormGroup;
  submitButtonText = '';
 // selectedFile: ImageSnippet | undefined;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private snackbar: MatSnackBar,
    private userService: UserService,
  ) {
    this.quizFormGroup = new FormGroup({
      id: new FormControl(null),
      quiz_name: new FormControl('',
        [Validators.required, this.badWordValidator()],
        [this.nameValidator()]),
      }
    )
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.submitButtonText = 'Update';
      this.quizService.getQuiz(id).subscribe(quiz => { this.quizFormGroup.patchValue(quiz) });
    } else {
      this.submitButtonText = 'Create';
    }
  }

  createOrUpdateQuiz() {
    const id = this.route.snapshot.paramMap.get('id');
    // const id = this.quizFormGroup.controls['id'].value
    //console.log(id)
    if (id) {
     // console.log(this.quizFormGroup.value)
      this.quizService.updateQuiz(this.quizFormGroup.value).subscribe(() => {
       this.snackbar.open('Quiz updated successfully!', 'OK',{duration:3000})
      })
      this.router.navigate(['/index']);
    } else {
      //console.log(this.quizFormGroup.value)
      console.log(this.userService.getUsername())
      this.quizFormGroup.value.created_by_user = this.userService.getUsername()
      //console.log(this.quizFormGroup.value)
      this.quizService.createQuiz(this.quizFormGroup.value).subscribe(() => {
        this.snackbar.open('Quiz created successfully!', 'OK',{duration:3000})
      })
      //console.log(this.quizFormGroup.value)
      this.router.navigate(['/index']);
    }
  }


  // Validators
  nameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.quizService.getQuizzes().pipe(map(quizzes => {
        const currentId = this.quizFormGroup.controls['id'].value;
        const currentName = this.quizFormGroup.controls['quiz_name'].value;
        const existingQuiz = quizzes.find(quiz => quiz.quiz_name.toLowerCase() === currentName.toLowerCase());
        return existingQuiz && existingQuiz.id !== currentId ? {nameAlreadyExists: true} : null
      }))
    }
  }
  badWordValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const forbidden = /bad word/.test(control.value);
      return forbidden ? {'badWord': {value: control.value}} : null;
    }
  }


}

