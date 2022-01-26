import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AuthGuard} from "./auth.guard";

import {IndexComponent} from "./index/index.component";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {QuizFormComponent} from "./quiz-form/quiz-form.component";
import {QuestionListComponent} from "./question-list/question-list.component";
import {QuestionFormComponent} from "./question-form/question-form.component";
import {QuestionCreateComponent} from "./question-create/question-create.component";
import {AnswerListComponent} from "./answer-list/answer-list.component";
import {AnswerFormComponent} from "./answer-form/answer-form.component";
import {AnswerCreateComponent} from "./answer-create/answer-create.component";



const routes: Routes = [
  // index page
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {path: 'index', component: IndexComponent },
  {path: 'login', component: LoginComponent },
  {path: 'logout', component: LogoutComponent },
  {path: 'quiz-form', component: QuizFormComponent },
  {path: 'quiz-form/:id', component: QuizFormComponent },
  // {path: 'question-list', component: QuestionListComponent },
  {path: 'question-list/:id', component: QuestionListComponent },
  {path: 'question-form', component: QuestionFormComponent },
  {path: 'question-form/:id', component: QuestionFormComponent },
  {path: 'question-create/:id', component: QuestionCreateComponent },
  // {path: 'answer-list', component: AnswerListComponent },
  {path: 'answer-list/:id', component: AnswerListComponent },
  // {path: 'answer-form', component: AnswerFormComponent },
  {path: 'answer-form/:id', component: AnswerFormComponent },
  {path: 'answer-create/:id', component: AnswerCreateComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
