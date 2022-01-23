import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AuthGuard} from "./auth.guard";

import {IndexComponent} from "./index/index.component";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {QuizFormComponent} from "./quiz-form/quiz-form.component";
import {QuestionListComponent} from "./question-list/question-list.component";

const routes: Routes = [
  // index page
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {path: 'index', component: IndexComponent },
  {path: 'login', component: LoginComponent },
  {path: 'logout', component: LogoutComponent },
  {path: 'quiz-form', component: QuizFormComponent },
  {path: 'quiz-form/:id', component: QuizFormComponent },
  {path: 'question-list', component: QuestionListComponent },
  {path: 'question-list/:id', component: QuestionListComponent },
  // {path: 'question-form', component: QuizFormComponent },
  // {path: 'question-form/:id', component: QuizFormComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
