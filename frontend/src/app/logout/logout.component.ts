import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, public userService: UserService) {
  }

  ngOnInit(): void {
  }
}
