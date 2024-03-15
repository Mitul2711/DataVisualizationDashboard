import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  ngOnInit(): void {
    this.pieChart();
    this.curvChart();
  }

  pieChart() {
    new Chart('pie-chart', {
      type: 'pie',
      data: {
        labels: [
          'Product 1',
          'Product 2',
          'Product 3'
        ],
        datasets: [{
          data: [300, 50, 100],
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
			type : 'line',
			data : {
        labels : [ 2000, 2005, 2010, 2015, 2020 ],
				datasets : [
						{
							data : [ 10000,15000,12000,14000,18000 ],
							label : "InstaGram",
							borderColor : "#e43202"
						},
						{
							data : [15000,12000,17000,10000,14000],
							label : "FaceBook",
							borderColor : "#0000FF"
						},
            {
              data : [12000,14000,10000,13000,16000],
							label : "Twitter",
							borderColor : "black"
            }
          ]
			}
		});

  }
}
