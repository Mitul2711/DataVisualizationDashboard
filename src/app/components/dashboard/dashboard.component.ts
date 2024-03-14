import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';

Chart.register(...registerables)


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  chart: any;

  constructor() { }


  ngOnInit(): void {
    this.renderChart();
    this.doughnutChart();
    this.lineChart();
  }

  renderChart() {

    new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June'],
        datasets: [{
          label: 'total followers (🠙+)',
          data: [120, 190, 310, 205, 522, 300],
          borderWidth: 1,
          backgroundColor: [
            'rgba(255,99,132,0.2)',
            'rgba(54,162,235,0.2)',
            'rgba(255,206,86,0.2)',
            'rgba(75,192,192,0.2)',
            'rgba(153,102,255,0.2)',
            'rgba(255,159,64,0.2  )',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54,162,235,1)',
            'rgba(255,206,86,1)',
            'rgba(75,192,192,1)',
            'rgba(153,102,255,1)',
            'rgba(255,159,64,1)',
          ]
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  doughnutChart() {
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: ['male', 'female'],
        datasets: [
          {
            data: [55, 45],
            backgroundColor: ['rgba(255, 0, 0, 0.7)', 'rgba(255, 0, 0, 0.3)']
          },
        ]
      }
    });
  }

  lineChart() {
    new Chart("line-chart", {
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
