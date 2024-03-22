import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import { FormDetailsService } from 'src/app/services/form-details.service';

Chart.register(...registerables)


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userDetails: any;
  incCount: any[] = [];
  perCount: any[] = [];
  instaFollowers: any[] = [];
  facebookFollowers: any[] = [];
  twitterFollowers: any[] = [];

  constructor(private formService: FormDetailsService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.formService.getData().subscribe(res => {
      this.userDetails = res;
      this.userDetails.forEach((e: any) => {
        this.incCount.push(e.janFollow);
        this.incCount.push(e.fabFollow);
        this.incCount.push(e.marchFollow);
        this.incCount.push(e.aprilFollow);
        this.incCount.push(e.mayFollow);
        this.incCount.push(e.juneFollow);
        this.perCount.push(e.male);
        this.perCount.push(e.female);
        this.instaFollowers.push(e.instaFollower.split(',').map((value: any) => parseFloat(value.trim())));
        this.facebookFollowers.push(e.facebookFollower.split(',').map((value: any) => parseFloat(value.trim())));
        this.twitterFollowers.push(e.twitterFollower.split(',').map((value: any) => parseFloat(value.trim())));
      });
      this.renderChart();
      this.doughnutChart(this.perCount);
      this.lineChart(this.instaFollowers[0], this.facebookFollowers[0], this.twitterFollowers[0]);
    })
  }

  renderChart() {

    new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June'],
        datasets: [{
          label: 'total followers (🠙+)',
          data: this.incCount,
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
        plugins: {
          title: {
            display: true,
            text: "Increment Count In Followers(Monthly)"
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  doughnutChart(data: any) {
    new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: ['male', 'female'],
        datasets: [
          {
            data: data,
            backgroundColor: ['rgba(255, 0, 0, 0.7)', 'rgba(255, 0, 0, 0.3)']
          },
        ]
      },
      options: {
          plugins: {
              title: {
                  display: true,
                  text: 'Ratio Of Followers'
              }
          }
      }
    });
  }

  lineChart(insta: any, facebook: any, twitter: any) {
    new Chart("line-chart", {
      type: 'line',
      data: {
        labels: [2000, 2005, 2010, 2015, 2020],
        datasets: [
          {
            data: insta,
            label: "InstaGram",
            borderColor: "#e43202"
          },
          {
            data: facebook,
            label: "FaceBook",
            borderColor: "#0000FF"
          },
          {
            data: twitter,
            label: "Twitter",
            borderColor: "black"
          }
        ]
      },
      options: {
          plugins: {
              title: {
                  display: true,
                  text: 'Increment Count in followers(Yearly)'
              }
          }
      }
    });
  }

}
