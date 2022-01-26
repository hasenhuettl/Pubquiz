import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Answer, AnswerService} from "../services/answer.service";
import {ActivatedRoute} from "@angular/router";



@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss']
})
export class AnswerListComponent implements OnInit {

  displayedColumns = ['id','user_answer', 'edit', 'delete'];
  answers: Answer[] = [];
  filteredAnswers: Answer[] = [];
  filterFormControl = new FormControl('');
  id = '';

  constructor(private answerService : AnswerService,
              private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('id') != null) {
      this.id = this.route.snapshot.paramMap.get('id')!;
    }
    this.answerService.getAnswers().subscribe((response) =>{
      this.answers = response
      this.filteredAnswers = this.answers
    })

    this.filterFormControl.valueChanges.subscribe(value => this.filter(value));
    this.route.paramMap.subscribe(params => {
      this.filterFormControl.setValue(params.get('filter'))
    })
  }

  filter(filterValue: string){
    this.filteredAnswers = this.answers.filter(a =>{
      return !filterValue || a.user_answer.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
    })
  }
  deleteAnswer(answer:Answer){
   this.answerService.deleteAnswer(answer).subscribe(()=>{
     this.ngOnInit()
   });//?
  }

  confirmDelete (answer: Answer){
    if (confirm("Are you sure to delete" + answer.user_answer + "?")) {
      this.deleteAnswer(answer)
    }
  }

}
