import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

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
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {path: 'index', component: IndexComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'quiz-form', component: QuizFormComponent, canActivate: [AuthGuard]},
  {path: 'quiz-form/:id', component: QuizFormComponent, canActivate: [AuthGuard]},
  {path: 'question-list/:id', component: QuestionListComponent, canActivate: [AuthGuard]},
  {path: 'question-form', component: QuestionFormComponent, canActivate: [AuthGuard]},
  {path: 'question-form/:id', component: QuestionFormComponent, canActivate: [AuthGuard]},
  {path: 'question-create/:id', component: QuestionCreateComponent, canActivate: [AuthGuard]},
  {path: 'answer-list/:id', component: AnswerListComponent, canActivate: [AuthGuard]},
  {path: 'answer-form/:id', component: AnswerFormComponent, canActivate: [AuthGuard]},
  {path: 'answer-create/:id', component: AnswerCreateComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
