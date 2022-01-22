import { Component, OnInit } from '@angular/core';
import {Quiz,QuizService} from "../services/quiz.service";
import {FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

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


  constructor(private quizService: QuizService,
              private route: ActivatedRoute,
  ) {  }

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
}
