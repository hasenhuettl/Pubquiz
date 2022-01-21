import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface Activity {
}

@Injectable({providedIn: 'root'})
export class ActivityService {
  constructor(
    private http: HttpClient,
  ) {}

}

