import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from "@angular/material/list";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {JwtModule} from "@auth0/angular-jwt";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatBadgeModule} from '@angular/material/badge';
import {IndexComponent} from "./index/index.component";
import {LogoutComponent} from "./logout/logout.component";
import {LoginComponent} from "./login/login.component";
import {QuizFormComponent} from "./quiz-form/quiz-form.component";
import {QuestionListComponent } from './question-list/question-list.component';
import {QuestionFormComponent } from './question-form/question-form.component';
import {QuestionCreateComponent } from './question-create/question-create.component';
import {AnswerListComponent} from './answer-list/answer-list.component';
import {AnswerFormComponent} from './answer-form/answer-form.component';
import { AnswerCreateComponent } from './answer-create/answer-create.component';


export function tokenGetter() {
  return localStorage.getItem('access_token')
}

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    LogoutComponent,
    QuizFormComponent,
    QuestionListComponent,
    QuestionFormComponent,
    QuestionCreateComponent,
    AnswerListComponent,
    AnswerFormComponent,
    AnswerCreateComponent,

  ],
  imports: [
    JwtModule.forRoot({config: {tokenGetter: tokenGetter}}),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    ReactiveFormsModule,

    BrowserAnimationsModule,

    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,

    MatDatepickerModule,
    MatNativeDateModule,

    MatSnackBarModule,

    MatPaginatorModule,
    MatBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
