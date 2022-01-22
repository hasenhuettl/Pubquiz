import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { PubquizApiService } from "./pubquiz-api.service";

export interface Quiz {
  id: number;
  quiz_name: string;
}

@Injectable({providedIn: 'root'})
export class QuizService {
  availableQuizzes: Quiz[] = [];
  constructor(
    private http: HttpClient,
    private pubquizApiService: PubquizApiService
  ) {
    this.getQuizzes().subscribe(quizzes => this.availableQuizzes = quizzes);
  }
  getQuizzes() {
    return this.http.get<Quiz[]>(`${this.pubquizApiService.base_url}/quiz/`);
  }
  getQuiz(id: string) {
    return this.http.get<Quiz>(`${this.pubquizApiService.base_url}/quiz/${id}/`);
  }
  createQuiz(quiz: Quiz) {
    return this.http.post<Quiz>(`${this.pubquizApiService.base_url}/quiz/`, quiz);
  }
  updateQuiz(quiz: Quiz) {
    return this.http.put<Quiz>(`${this.pubquizApiService.base_url}/quiz/${quiz.id}/`, quiz);
  }
  deleteQuiz(quiz: Quiz) {
    return this.http.delete<Quiz>(`${this.pubquizApiService.base_url}/quiz/${quiz.id}/`);
  }
}

