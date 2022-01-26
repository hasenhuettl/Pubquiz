import { Component, OnInit } from '@angular/core';
import {Quiz,QuizService} from "../services/quiz.service";
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  displayedColumns = ['id', 'quiz_name', 'join', 'edit', 'delete'];
  quizzes: Quiz[] = [];
  filteredQuizzes: Quiz[] = [];
  filterFormControl = new FormControl('');
  quizFormGroup: FormGroup;


  constructor(private quizService: QuizService,
              private route: ActivatedRoute,
  ) {
    this.quizFormGroup = new FormGroup({
      id: new FormControl(null),
      quiz_name: new FormControl('',[this.titleValidator()])
    })
  }

  ngOnInit(): void {
    //this.quizService.getQuizzes().subscribe(quizzes => this.quizzes = quizzes)
    this.quizService.getQuizzes().subscribe((response) => {
      //console.log({response})
      this.quizzes = response
      this.filteredQuizzes = this.quizzes
    })

    this.filterFormControl.valueChanges.subscribe(value => this.filter(value));
    this.route.paramMap.subscribe(params => {
      this.filterFormControl.setValue(params.get('filter'))
    });
  }


  filter(filterValue: string) {
    this.filteredQuizzes = this.quizzes.filter(a => {
        return !filterValue || a.quiz_name.toLowerCase().includes(filterValue.toLowerCase())
      }
    )
  }

  deleteQuiz(quiz: Quiz): void {
    this.quizService.deleteQuiz(quiz).subscribe(() => {
      this.ngOnInit()
    });
  }

  confirmDelete(quiz: Quiz) {
    if (confirm("Are you sure to delete '" + quiz.quiz_name + "'?")) {
      this.deleteQuiz(quiz)
    }
  }

  titleValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.quizService.getQuizzes().pipe(map(quizzes => {
        const currentId = this.quizFormGroup.controls['id'].value;
        const currentTitle = this.quizFormGroup.controls['quiz_name'].value;
        const existingMovie = quizzes.find(quiz => quiz.quiz_name === currentTitle);

        return existingMovie && existingMovie.id !== currentId ? {titleAlreadyExists: true} : null
      }))
    }
  }

}
