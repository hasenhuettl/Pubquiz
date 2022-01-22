import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Quiz,QuizService} from "../services/quiz.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
      displayedColumns = ['id', 'quiz_name','edit','delete'];
      quizzes: Quiz[] = [];


  constructor(private quizService: QuizService,
              private http: HttpClient,
  )  {  }

  ngOnInit(): void {
    /**this.quizService.getQuizzes().subscribe(quizzes => this.quizzes = quizzes)**/
    this.quizService.getQuizzes().subscribe((response) => {
      //console.log({response})
      this.quizzes = response
    })
  }
  deleteQuiz(quiz: Quiz): void {
    this.quizService.deleteQuiz(quiz).subscribe( () => { this.ngOnInit() });
  }

}
