import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AuthGuard} from "./auth.guard";

import {IndexComponent} from "./index/index.component";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {QuizFormComponent} from "./quiz-form/quiz-form.component";

const routes: Routes = [
  // index page
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {path: 'index', component: IndexComponent },
  {path: 'login', component: LoginComponent },
  {path: 'logout', component: LogoutComponent },
  {path: 'quiz-form', component: QuizFormComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
