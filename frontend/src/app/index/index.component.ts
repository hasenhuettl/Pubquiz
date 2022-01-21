import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {map, shareReplay} from 'rxjs/operators';
import {Quiz,QuizService} from "../services/quiz.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
      displayedColumns = ['quiz_name'];
      quizzes: Quiz[] = [];


  cols$: Observable<number> = this.breakpointObserver
    .observe([Breakpoints.Small, Breakpoints.XSmall])
    .pipe(
      map((result) => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          return 2;
        } else if (result.breakpoints[Breakpoints.Small]) {
          return 4;
        } else {
          return 10;
        }
      }),
      shareReplay()
    );

  constructor(private quizService: QuizService,
    private breakpointObserver: BreakpointObserver
  )
  {

  }

  ngOnInit(): void {
    /**this.quizService.getQuizzes().subscribe(quizzes => this.quizzes = quizzes)**/
    this.quizService.getQuizzes().subscribe((response) => {
      console.log({response})
      this.quizzes = response
    })
  }

}
