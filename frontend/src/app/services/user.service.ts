import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {MatSnackBar} from "@angular/material/snack-bar";
import {PubquizApiService} from "./pubquiz-api.service";

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  date_joined: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly accessTokenLocalStorageKey = 'access_token';
  isLoggedIn = new BehaviorSubject(false);

  constructor(private http: HttpClient,
              private router: Router,
              private jwtHelperService: JwtHelperService,
              private snackbar: MatSnackBar,
              private pubquizApiService: PubquizApiService
  ) {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    if (token) {
      console.log('Token expiration date: ' + this.jwtHelperService.getTokenExpirationDate(token));
      const tokenValid = !this.jwtHelperService.isTokenExpired(token);
      this.isLoggedIn.next(tokenValid);
    }
  }

// API
  login(userData: { username: string, password: string }): void {
    this.http.post('/api/api-token-auth/', userData)
      .subscribe((res: any) => {
        this.isLoggedIn.next(true);
        localStorage.setItem('access_token', res.token);



        // To do: quiz list
        this.router.navigate(['quiz-list']);
        this.snackbar.open('Successfully logged in', 'OK',{duration:3000});
      }, () => {
        this.snackbar.open('Invalid credentials', 'OK',{duration:3000})
      });
  }

  logout(): void {
    localStorage.removeItem(this.accessTokenLocalStorageKey);
    this.isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }

  getUser(id: number) {
    return this.http.get<User>(`${this.pubquizApiService.base_url}/users/${id}/`);
  }
  getUsers() {
    return this.http.get<User[]>(`${this.pubquizApiService.base_url}/users/`);
  }
  createUser(user: User) {
    return this.http.post<User>(`${this.pubquizApiService.base_url}/users/`, user);
  }
  updateUser(user: User) {
    return this.http.put<User>(`${this.pubquizApiService.base_url}/users/${user.id}/`, user);
  }
}
