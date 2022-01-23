import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {QuizService} from "../services/quiz.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";


/**class ImageSnippet {
  constructor(public src: string, public file: File) {}
}**/

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
    private snackbar: MatSnackBar
  ) {
    this.quizFormGroup = new FormGroup({
      id: new FormControl(null),
      quiz_name: new FormControl('', [Validators.required], [this.nameValidator()]),
      //description: new FormControl('', [Validators.required])
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
    //const id = this.route.snapshot.paramMap.get('id');
    const id = this.quizFormGroup.controls['id'].value
    if (id) {
      console.log(this.quizFormGroup.value)
      this.quizService.updateQuiz(this.quizFormGroup.value).subscribe(() => {
       this.snackbar.open('Quiz updated successfully!', 'OK',{duration:3000})
      })
      this.router.navigate(['/index']);
    } else {
      console.log(this.quizFormGroup.value)
      this.quizService.createQuiz(this.quizFormGroup.value).subscribe(() => {
        this.snackbar.open('Quiz created successfully!', 'OK',{duration:3000})
      })
      //console.log(this.quizFormGroup.value)
      this.router.navigate(['/index']);
    }
  }
  /**uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', this.quizFormGroup.value.name);
    formData.append('description', this.quizFormGroup.value.description);
    console.log(image)

    return this.http.post('/api/sports/', formData);
  }**/

  // Validators
  nameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.quizService.getQuizzes().pipe(map(quizzes => {
        const currentId = this.quizFormGroup.controls['id'].value;
        const currentName = this.quizFormGroup.controls['quiz_name'].value;
        const existingQuiz = quizzes.find(quiz => quiz.quiz_name === currentName);
        return existingQuiz && existingQuiz.id !== currentId ? {nameAlreadyExists: true} : null
      }))
    }
  }

  /**processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.uploadImage(this.selectedFile.file).subscribe(
        (res:any) => {

        },
        (err:any) => {

        })
    });

    reader.readAsDataURL(file);
  }**/
}

