import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDetailsService {

  constructor(private http: HttpClient) { }

  url: string = "http://localhost:200/details";

  btn: boolean = true;

  postData(data: any) {
    return this.http.post(this.url,data);
  }

  getData() {
    return this.http.get(this.url);
  }

}
