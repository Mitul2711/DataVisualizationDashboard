import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs'
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit, OnDestroy {

  revenueShow: boolean = true;
  customerShow: boolean = false;
  transactionShow: boolean = false;
  productShow: boolean = false;

  revenueData: any[] = [];
  productName: any[] = [];
  amount: any[] = [];
  salesNumber: any[] = [];
  totalRevenue: number = 0;

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
  

  private subscriptions: Subscription[] = [];

  constructor(private dataService: DataService) { }


  ngOnInit(): void {
    this.getData();
    this.curvChart();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


  revenue() {
    this.revenueShow = true;
    this.customerShow = false;
    this.transactionShow = false;
    this.productShow = false;
    this.getData();
  }

  customer() {
    this.customerShow = true;
    this.revenueShow = false;
    this.transactionShow = false;
    this.productShow = false;
    this.getData();
  }

  transaction() {
    this.transactionShow = true;
    this.customerShow = false;
    this.revenueShow = false;
    this.productShow = false;
    this.getData();
  }

  product() {
    this.productShow = true;
    this.revenueShow = false;
    this.transactionShow = false;
    this.customerShow = false;
    this.getData();
  }

  getData() {
    // Clear arrays before fetching new data
    this.productName = [];
    this.amount = [];
    this.salesNumber = [];
    this.mediaName = [];
    this.customerCount = [];
    this.methodName = [];
    this.transactionCount = [];
    this.prodName = [];
    this.prodCount = [];
  
    // Unsubscribe from previous subscriptions
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
  
    // Fetch data and subscribe to each observable
    const revenueSubscription = this.dataService.revenueData().subscribe((res: any) => {
      this.revenueData = res;
      this.revenueData.forEach((e: any) => {
        this.productName.push(e.name);
        this.amount.push(e.amount);
        this.salesNumber.push(e.sales);
      });
  
      this.revenueChart(this.productName, this.amount);
      this.totalRevenue = this.amount.reduce((acc, curr) => acc + curr, 0);
    });
  
    const customerSubscription = this.dataService.customerData().subscribe((res: any) => {
      this.customerData = res;
      this.customerData.forEach((e: any) => {
        this.mediaName.push(e.media);
        this.customerCount.push(e.customer);
      });
  
      this.customerChart(this.mediaName, this.customerCount);
      this.totalCustomer = this.customerCount.reduce((acc, curr) => acc + curr, 0);
    });
  
    const transactionSubscription = this.dataService.transactionData().subscribe((res: any) => {
      this.transactionData = res;
      this.transactionData.forEach((e: any) => {
        this.methodName.push(e.method);
        this.transactionCount.push(e.paymentCount);
      });
  
      this.transactionChart(this.methodName, this.transactionCount);
      this.totalTransaction = this.transactionCount.reduce((acc, curr) => acc + curr, 0);
    });
  
    const productSubscription = this.dataService.productData().subscribe((res: any) => {
      this.productData = res;
      this.productData.forEach((e: any) => {
        this.prodName.push(e.name);
        this.prodCount.push(e.selling);
      });
  
      this.productChart(this.prodName, this.prodCount);
      this.totalProduct = this.prodCount.reduce((acc, curr) => acc + curr, 0);
    });
  
    // Store subscriptions to manage them later
    this.subscriptions.push(revenueSubscription, customerSubscription, transactionSubscription, productSubscription);
  }
  


  revenueChart(product: any, datas: any) {
    if (!product || !datas) {
      console.error('Product data or labels are null.');
      return;
    }
  
    const canvas = document.getElementById('revenue-chart') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Canvas element not found.');
      return;
    }
  
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Failed to acquire canvas context.');
      return;
    }
  
    new Chart(ctx, {
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
    if (!media || !data) {
      console.error('Media data or labels are null.');
      return;
    }
  
    const canvas = document.getElementById('customer-chart') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Canvas element not found.');
      return;
    }
  
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Failed to acquire canvas context.');
      return;
    }
  
    new Chart(ctx, {
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
  

  productChart(product: any, data: any) {
    if (!product || !data) {
      console.error('Product data or labels are null.');
      return;
    }
  
    const canvas = document.getElementById('product-chart') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Canvas element not found.');
      return;
    }
  
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Failed to acquire canvas context.');
      return;
    }
  
    new Chart(ctx, {
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
  
  transactionChart(method: any, data: any) {
    if (!method || !data) {
      console.error('Method data or labels are null.');
      return;
    }
  
    const canvas = document.getElementById('transaction-chart') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Canvas element not found.');
      return;
    }
  
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Failed to acquire canvas context.');
      return;
    }
  
    new Chart(ctx, {
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

