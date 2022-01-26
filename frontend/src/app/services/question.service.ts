import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { PubquizApiService } from "./pubquiz-api.service";
import {Quiz} from "./quiz.service";

export interface Question {
  id: number;
  question_string: string;
  master_answer: string;
  quiz: Quiz;
  created_by_user: string;
}

@Injectable({providedIn: 'root'})
export class QuestionService {
  availableQuestions: Question[] = [];
  constructor(
    private http: HttpClient,
    private PubquizApiService: PubquizApiService
  ) {
    this.getQuestions().subscribe(questions => this.availableQuestions = questions);
  }
  getQuestions() {
    return this.http.get<Question[]>(`${this.PubquizApiService.base_url}/question/`);
  }
  getQuestion(id: string) {
    return this.http.get<Question>(`${this.PubquizApiService.base_url}/question/${id}/`);
  }
  createQuestion(question: Question) {
    return this.http.post<Question>(`${this.PubquizApiService.base_url}/question/`, question);
  }
  updateQuestion(question: Question) {
    return this.http.put<Question>(`${this.PubquizApiService.base_url}/question/${question.id}/`, question);
  }
  deleteQuestion(question: Question) {
    return this.http.delete<Question>(`${this.PubquizApiService.base_url}/question/${question.id}/`);
  }
}

