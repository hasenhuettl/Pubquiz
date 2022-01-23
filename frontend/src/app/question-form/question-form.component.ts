import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {QuestionService} from "../services/question.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  questionFormGroup: FormGroup
  submitButtonText = '';
  // selectedFile: ImageSnippet | undefined;

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
      master_answer: new FormControl('', [Validators.required], [this.nameValidator()]),
      // quiz FK?
      }
    )
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.submitButtonText = 'Update';
      this.questionService.getQuestion(id).subscribe(question => { this.questionFormGroup.patchValue(question) });
    } else {
      this.submitButtonText = 'Create';
    }
  }

  createOrUpdateQuestion() {
    const id = this.route.snapshot.paramMap.get('id');
    // const id = this.questionFormGroup.controls['id'].value
    console.log(id)
    if (id) {
      console.log(this.questionFormGroup.value)
      this.questionService.updateQuestion(this.questionFormGroup.value).subscribe(() => {
        this.snackbar.open('Question updated successfully!', 'OK',{duration:3000})
      })
      this.router.navigate(['/index']);
    } else {
      console.log(this.questionFormGroup.value)
      this.questionService.createQuestion(this.questionFormGroup.value).subscribe(() => {
        this.snackbar.open('Question created successfully!', 'OK',{duration:3000})
      })
      //console.log(this.questionFormGroup.value)
      this.router.navigate(['/index']);
    }
  }


  // Validators
  nameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.questionService.getQuestions().pipe(map(questions => {
        const currentId = this.questionFormGroup.controls['id'].value;
        const currentName = this.questionFormGroup.controls['question_string'].value;
        const existingQuestion = questions.find(question => question.question_string === currentName);
        return existingQuestion && existingQuestion.id !== currentId ? {nameAlreadyExists: true} : null
      }))
    }
  }


  submit() {
    this.createOrUpdateQuestion()
    this.router.navigate(['/question-list'])
  }
}

