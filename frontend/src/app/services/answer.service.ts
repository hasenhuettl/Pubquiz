import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { PubquizApiService } from "./pubquiz-api.service";


export interface Answer {
  id: number;
  user_answer: string;
}
@Injectable({
  providedIn: 'root'
})
export class AnswerService {
availableAnswers: Answer[] = [];
  constructor(
    private http: HttpClient,
    private pubquizApiService: PubquizApiService
  ){
    this.getAnswers().subscribe(answers => this.availableAnswers = answers)
  }
  getAnswers() {
    return this.http.get<Answer[]>(`${this.pubquizApiService.base_url}/userAnswer/`);
  }
  getAnswer(id: string) {
    return this.http.get<Answer>(`${this.pubquizApiService.base_url}/userAnswer/${id}/`);
  }
  createAnswer(answer: Answer) {
    return this.http.post<Answer>(`${this.pubquizApiService.base_url}/userAnswer/`, answer);
  }
  updateAnswer(answer: Answer) {
    return this.http.put<Answer>(`${this.pubquizApiService.base_url}/userAnswer/${answer.id}/`, answer);
  }
  deleteAnswer(answer: Answer) {
    return this.http.delete<Answer>(`${this.pubquizApiService.base_url}/userAnswer/${answer.id}/`);
  }

}
