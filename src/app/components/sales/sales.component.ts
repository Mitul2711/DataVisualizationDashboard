import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { empty } from 'rxjs';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit{

  revenueShow: boolean = true;
  customerShow: boolean = false;
  transactionShow: boolean = false;
  productShow: boolean = false;

  revenueData: any[] = [];
  productName: any[] = [];
  amount: any[] = [];
  salesNumber: any[] = [];
  totalRevenue: number=0;

  customerData: any[] = [];
  mediaName: any[] = [];
  customerCount: any[] = [];
  totalCustomer: number = 0;

  transactionData: any[] = [];
  methodName: any[] = [];
  transactionCount: any[] = [];
  totalTransaction: number = 0;

  productData: any[] = [];
  prodName: any[] = [];
  prodCount: any[] = [];
  totalProduct: number = 0;

  constructor(private dataService: DataService) {}


  ngOnInit(): void {
   this.loadMethod();
    this.curvChart();
  }

  loadMethod() {
    this.getRevenueData();
    this.getCustomerData();
    this.getTransactionData();
    this.getProductData();
  }


  getRevenueData() {
    this.productName = [];
    this.amount = [];
    this.totalRevenue = 0;   
    this.revenueShow = true;
    this.customerShow = false;
    this.transactionShow = false;
    this.productShow = false;
    this.dataService.revenueData().subscribe((res: any) => {
      this.revenueData = res;
      this.revenueData.forEach((e: any) => {
        this.productName.push(e.name);
        this.amount.push(e.amount);
        this.salesNumber.push(e.sales);
      });

      this.revenueChart(this.productName, this.amount);
      for(let i=0; i<this.amount.length; i++) {
        this.totalRevenue = this.totalRevenue + this.amount[i];
      }
    })   
    
  }

  getCustomerData() {

    this.mediaName = [];
    this.customerCount = [];
    this.totalCustomer = 0;
    this.customerShow = true;
    this.revenueShow = false;
    this.transactionShow = false;
    this.productShow = false;
    this.dataService.customerData().subscribe((res: any) => {
      this.customerData = res;
      this.customerData.forEach((e: any) => {
        this.mediaName.push(e.media);
        this.customerCount.push(e.customer);
      });

      this.customerChart(this.mediaName, this.customerCount);
      for(let i=0; i<this.customerCount.length; i++) {
        this.totalCustomer = this.totalCustomer + this.customerCount[i];
      }
      console.log(this.totalCustomer); 
    })  
    
  }

  getTransactionData() {
    this.methodName = [];
    this.transactionCount = [];
    this.totalTransaction = 0;
    this.transactionShow = true;
    this.customerShow = false;
    this.revenueShow = false;
    this.productShow = false;

    this.dataService.transactionData().subscribe((res: any) => {
      this.transactionData = res;
      this.transactionData.forEach((e: any) => {
        this.methodName.push(e.method);
        this.transactionCount.push(e.paymentCount);
      });

      this.transactionChart(this.methodName, this.transactionCount);
      for(let i=0; i<this.transactionCount.length; i++) {
        this.totalTransaction = this.totalTransaction + this.transactionCount[i];
      }
    })   
    
  }

  getProductData() {
    this.prodCount= [];
    this.prodName = [];
    this.totalProduct = 0;
    this.productShow = true;
    this.revenueShow = false;
    this.transactionShow = false;
    this.customerShow = false;
    this.dataService.productData().subscribe((res: any) => {
      this.productData = res;
      this.productData.forEach((e: any) => {
        this.prodName.push(e.name);
        this.prodCount.push(e.selling);
      });

      this.productChart(this.prodName, this.prodCount);
      for(let i=0; i<this.prodCount.length; i++) {
        this.totalProduct = this.totalProduct + this.prodCount[i];
      }
    })   
    
  }

  revenueChart(product: any, datas: any) {
    new Chart('revenue-chart', {
      type: 'pie',
      data: {
        labels: product,
        datasets: [{
          data: datas,
          backgroundColor: [
            'rgb(173, 216, 230)',
            'rgb(144, 238, 144)',
            'rgb(255, 213, 128)'
          ],
          hoverOffset: 5
        }]
      }
    });
  }

  customerChart(media: any, data: any) {
    new Chart('customer-chart', {
      type: 'pie',
      data: {
        labels: media,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgb(144, 238, 144)',
            'rgb(255, 213, 128)',
            'rgb(173, 216, 230)'
          ],
          hoverOffset: 4
        }]
      }
    });
  }

  transactionChart(method: any, data: any) {
    new Chart('transaction-chart', {
      type: 'pie',
      data: {
        labels: method,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgb(144, 238, 144)',
            'rgb(255, 213, 128)',
            'rgb(173, 216, 230)',
            'rgb(255, 128, 128)'

          ],
          hoverOffset: 4
        }]
      }
    });
  }

  productChart(product: any, data: any) {
    new Chart('product-chart', {
      type: 'pie',
      data: {
        labels: product,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgb(144, 238, 144)',
            'rgb(255, 213, 128)',
            'rgb(173, 216, 230)'
          ],
          hoverOffset: 4
        }]
      }
    });
  }


  curvChart() {
    new Chart("curv-chart", {
      type: 'line',
      data: {
        labels: [2000, 2005, 2010, 2015, 2020],
        datasets: [
          {
            data: [10000, 15000, 12000, 14000, 18000],
            label: "InstaGram",
            borderColor: "#e43202"
          },
          {
            data: [15000, 12000, 17000, 10000, 14000],
            label: "FaceBook",
            borderColor: "#0000FF"
          },
          {
            data: [12000, 14000, 10000, 13000, 16000],
            label: "Twitter",
            borderColor: "black"
          }
        ]
      }
    });

  }
}

