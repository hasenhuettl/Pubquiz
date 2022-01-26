import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {QuestionService} from "../services/question.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.scss']
})
export class QuestionCreateComponent implements OnInit {

  questionFormGroup: FormGroup
  submitButtonText = '';
  quiz_id = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private snackbar: MatSnackBar
  ) {
    this.questionFormGroup = new FormGroup({
        id: new FormControl(null),
        question_string: new FormControl('', [Validators.required], [this.nameValidator()]),
        master_answer: new FormControl(''),
        created_by_user: new FormControl(''),
        quiz: new FormControl(this.route.snapshot.paramMap.get('id'))
      }
    )
  }

  ngOnInit(): void {
      this.submitButtonText = 'Create';
  }

  createQuestion() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.quiz_id = this.route.snapshot.paramMap.get('id')!;
    }
    console.log(this.questionFormGroup.value)
    this.questionService.createQuestion(this.questionFormGroup.value).subscribe(() => {
      this.snackbar.open('Question created successfully!', 'OK', {duration: 3000})
    })
    //console.log(this.questionFormGroup.value)
    this.router.navigate(['/question-list/' + this.quiz_id]);
  }


  // Validators
  nameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.questionService.getQuestions().pipe(map(questions => {
        const currentId1 = this.questionFormGroup.controls['id'].value;
        const currentName1 = this.questionFormGroup.controls['question_string'].value;
        const currentQuizId1 = this.questionFormGroup.controls['quiz'].value.id;
        const existingQuestion1 = questions.find(question => (question.question_string === currentName1 && question.quiz.id == currentQuizId1));
        return existingQuestion1 && existingQuestion1.id !== currentId1 ? {nameAlreadyExists: true} : null
      }))
    }
  }

}

