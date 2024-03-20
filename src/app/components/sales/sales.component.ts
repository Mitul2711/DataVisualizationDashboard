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

  lineCusInsData: any[] = [];
  lineCusFacData: any[] = [];
  lineCusTwiData: any[] = [];
  lineRevInsData: any[] = [];
  lineRevFacData: any[] = [];
  lineRevTwiData: any[] = [];

  lineCusCashData: any[] = [];
  lineCusCardData: any[] = [];
  lineCusUpiData: any[] = [];
  lineCusPaypalData: any[] = [];

  lineProd1Data: any[] = [];
  lineProd2Data: any[] = [];
  lineProd3Data: any[] = [];

  private subscriptions: Subscription[] = [];
  private lineSub: Subscription[] = [];

  constructor(private dataService: DataService) { }


  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.lineSub.forEach(subscription => subscription.unsubscribe());
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
    this.productName = [];
    this.amount = [];
    this.salesNumber = [];
    this.mediaName = [];
    this.customerCount = [];
    this.methodName = [];
    this.transactionCount = [];
    this.prodName = [];
    this.prodCount = [];

    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];

    const revenueSubscription = this.dataService.revenueData().subscribe((res: any) => {
      this.revenueData = res;
      this.revenueData.forEach((e: any) => {
        this.productName.push(e.name);
        this.amount.push(e.amount);
        this.salesNumber.push(e.sales);
        if (e.name === 'Product 1') {
          this.lineRevInsData.push(e[2000], e[2005], e[2010], e[2015], e[2020]);
        }
        if (e.name === 'Product 2') {
          this.lineRevFacData.push(e[2000], e[2005], e[2010], e[2015], e[2020]);
        }
        if (e.name === 'Product 3') {
          this.lineRevTwiData.push(e[2000], e[2005], e[2010], e[2015], e[2020]);
        }
      });
      console.log(this.lineRevInsData);
      
      this.revenueChart(this.productName, this.amount);
      this.curvRevChart(this.lineRevInsData, this.lineRevFacData, this.lineRevTwiData, this.productName)
      this.totalRevenue = this.amount.reduce((acc, curr) => acc + curr, 0);
    });

    const customerSubscription = this.dataService.customerData().subscribe((res: any) => {
      this.customerData = res;
      this.customerData.forEach((e: any) => {
        this.mediaName.push(e.media);
        this.customerCount.push(e.customer);

        if (e.media === 'InstaGram') {
          this.lineCusInsData.push(e[2000], e[2005], e[2010], e[2015], e[2020]);
        }
        if (e.media === 'FaceBook') {
          this.lineCusFacData.push(e[2000], e[2005], e[2010], e[2015], e[2020]);
        }
        if (e.media === 'Twitter') {
          this.lineCusTwiData.push(e[2000], e[2005], e[2010], e[2015], e[2020]);
        }
      });
      console.log(this.lineCusInsData);
      
      this.customerChart(this.mediaName, this.customerCount);
      this.curvCusChart(this.lineCusInsData, this.lineCusFacData, this.lineCusTwiData, this.mediaName)
      this.totalCustomer = this.customerCount.reduce((acc, curr) => acc + curr, 0);
    });

    const transactionSubscription = this.dataService.transactionData().subscribe((res: any) => {
      this.transactionData = res;
      this.transactionData.forEach((e: any) => {
        this.methodName.push(e.method);
        this.transactionCount.push(e.paymentCount);
        if (e.method === 'card') {
          this.lineCusCardData.push(e[2000], e[2005], e[2010], e[2015], e[2020]);
        }
        if (e.method === 'UPI') {
          this.lineCusUpiData.push(e[2000], e[2005], e[2010], e[2015], e[2020]);
        }
        if (e.method === 'cash') {
          this.lineCusCashData.push(e[2000], e[2005], e[2010], e[2015], e[2020]);
        }
        if (e.method === 'payPal') {
          this.lineCusPaypalData.push(e[2000], e[2005], e[2010], e[2015], e[2020]);
        }
      });

      this.transactionChart(this.methodName, this.transactionCount);
      this.curvTransChart(this.lineCusCashData, this.lineCusUpiData, this.lineCusCardData, this.lineCusPaypalData, this.methodName)
      this.totalTransaction = this.transactionCount.reduce((acc, curr) => acc + curr, 0);
    });

    const productSubscription = this.dataService.productData().subscribe((res: any) => {
      this.productData = res;
      this.productData.forEach((e: any) => {
        this.prodName.push(e.name);
        this.prodCount.push(e.selling);

        if (e.name === 'Product 1') {
          this.lineProd1Data.push(e[2000], e[2005], e[2010], e[2015], e[2020]);
        }
        if (e.name === 'Product 2') {
          this.lineProd2Data.push(e[2000], e[2005], e[2010], e[2015], e[2020]);
        }
        if (e.name === 'Product 3') {
          this.lineProd3Data.push(e[2000], e[2005], e[2010], e[2015], e[2020]);
        }
      });

      this.productChart(this.prodName, this.prodCount);
      this.curvProdChart(this.lineProd1Data, this.lineProd2Data, this.lineProd3Data, this.prodName)
      this.totalProduct = this.prodCount.reduce((acc, curr) => acc + curr, 0);
    });

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



  curvCusChart(insta: any, face: any, twi: any, media: any) {
    const canvas = document.getElementById('curvCus-chart') as HTMLCanvasElement;
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
      type: 'line',
      data: {
        labels: [2000, 2005, 2010, 2015, 2020],
        datasets: [
          {
            data: insta,
            label: media[0],
            borderColor: "#e43202"
          },
          {
            data: face,
            label: media[1],
            borderColor: "#0000FF"
          },
          {
            data: twi,
            label: media[2],
            borderColor: "black"
          }
        ]
      }
    });

  }

  curvRevChart(insta: any, face: any, twi: any, product: any) {
    const canvas = document.getElementById('curvRev-chart') as HTMLCanvasElement;
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
      type: 'line',
      data: {
        labels: [2000, 2005, 2010, 2015, 2020],
        datasets: [
          {
            data: insta,
            label: product[0],
            borderColor: "#e43202"
          },
          {
            data: face,
            label: product[1],
            borderColor: "#0000FF"
          },
          {
            data: twi,
            label: product[2],
            borderColor: "black"
          }
        ]
      }
    });

  }

  curvTransChart(cash: any, upi: any, card: any, paypal: any, method: any) {
    const canvas = document.getElementById('curvTran-chart') as HTMLCanvasElement;
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
      type: 'line',
      data: {
        labels: [2000, 2005, 2010, 2015, 2020],
        datasets: [
          {
            data: cash,
            label: method[0],
            borderColor: "#e43202"
          },
          {
            data: upi,
            label: method[1],
            borderColor: "#0000FF"
          },
          {
            data: card,
            label: method[2],
            borderColor: "black"
          },
          {
            data: paypal,
            label: method[3],
            borderColor: "yellow"
          }
        ]
      }
    });

  }

  curvProdChart(prod1: any, prod2: any, prod3: any, product: any) {
    const canvas = document.getElementById('curvProd-chart') as HTMLCanvasElement;
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
      type: 'line',
      data: {
        labels: [2000, 2005, 2010, 2015, 2020],
        datasets: [
          {
            data: prod1,
            label: product[0],
            borderColor: "#e43202"
          },
          {
            data: prod2,
            label: product[1],
            borderColor: "#0000FF"
          },
          {
            data: prod3,
            label: product[2],
            borderColor: "black"
          }
        ]
      }
    });

  }

}

