import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Revenue } from '../models/data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  revenueUrl : string = "http://localhost:3000/revenue";

  constructor(private http: HttpClient) { }

  revenueData() {
    return this.http.get(this.revenueUrl);
  }

}
