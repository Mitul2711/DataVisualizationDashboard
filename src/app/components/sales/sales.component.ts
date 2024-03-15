import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  revenueData: any;
  productName: any[] = [];
  amount: any[] = [];
  salesNumber: any[] = [];
  totalRevenue: number=0;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getData();
    this.curvChart();
  }

  getData() {
    this.dataService.revenueData().subscribe((res: any) => {
      this.revenueData = res;
      this.revenueData.forEach((e: any) => {
        this.productName.push(e.name);
        this.amount.push(e.amount);
        this.salesNumber.push(e.sales);
      });

      this.pieChart(this.productName, this.amount);
      for(let i=0; i<this.amount.length; i++) {
        debugger
        this.totalRevenue = this.totalRevenue + this.amount[i];
      }
            
    })  
    
  }

  pieChart(product: any, datas: any) {
    new Chart('pie-chart', {
      type: 'pie',
      data: {
        labels: product,
        datasets: [{
          data: datas,
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

