import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {QuestionService} from "../services/question.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../services/user.service";


@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  questionFormGroup: FormGroup
  submitButtonText = '';
  quiz_id = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private userService: UserService,
    private snackbar: MatSnackBar,
  ) {
    this.questionFormGroup = new FormGroup({
        id: new FormControl(null),
        question_string: new FormControl('', [Validators.required], [this.nameValidator()]),
        master_answer: new FormControl(''),
        created_by_user: new FormControl(''),
        quiz: new FormControl(),
      }
    )
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.submitButtonText = 'Update';
      this.questionService.getQuestion(id).subscribe(question => {
        this.questionFormGroup.patchValue(question)
        this.quiz_id = this.questionFormGroup.controls['quiz'].value.id
      });
    } else {
      this.submitButtonText = 'Create';
    }
  }

  updateQuestion() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.quiz_id = this.questionFormGroup.controls['quiz'].value.id

      this.questionService.updateQuestion(this.questionFormGroup.value).subscribe(() => {
        this.snackbar.open('Question updated successfully!', 'OK', {duration: 3000})
      })
      this.router.navigate(['/question-list/' + this.quiz_id]);
    } else {

      this.snackbar.open('An error occurred!', 'OK', {duration: 3000})
      this.router.navigate(['/index']);
    }
  }

  nameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.questionService.getQuestions().pipe(map(questions => {
        const currentId = this.questionFormGroup.controls['id'].value;
        const currentName = this.questionFormGroup.controls['question_string'].value;
        const currentQuizId = this.questionFormGroup.controls['quiz'].value.id;
        const existingQuestion = questions.find(question => (
          question.question_string.toLowerCase() === currentName.toLowerCase() && question.quiz.id == currentQuizId)
        );
        return existingQuestion && existingQuestion.id !== currentId ? {nameAlreadyExists: true} : null
      }))
    }
  }
}
