import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Revenue } from '../models/data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  revenueUrl : string = "http://localhost:3000/revenue";
  customerUrl: string = "http://localhost:3000/customer";
  transactionUrl: string = "http://localhost:3000/transaction";
  productUrl: string = "http://localhost:3000/product";

  constructor(private http: HttpClient) { }

  revenueData() {
    return this.http.get(this.revenueUrl);
  }

  customerData() {
    return this.http.get(this.customerUrl);
  }

  transactionData() {
    return this.http.get(this.transactionUrl);
  }

  productData() {
    return this.http.get(this.productUrl);
  }


}
