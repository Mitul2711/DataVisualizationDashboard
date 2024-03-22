import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { FormDetailsService } from 'src/app/services/form-details.service';

@Component({
  selector: 'app-abc',
  templateUrl: './abc.component.html',
  styleUrls: ['./abc.component.scss']
})
export class AbcComponent implements OnInit {

  constructor(private formService: FormDetailsService) { }

  ngOnInit(): void {
    this.getData();
  }

  followersData: any;
  incCount: any[]=[];
  instaFollowers: any[] = [];
  facebookFollowers: any[] = [];
  twitterFollowers: any[] = [];
  instaAvg: number = 0;
  faceBookAvg: number = 0;
  twitterAvg: number = 0;

  getData() {
    this.formService.getData().subscribe(res => {
      this.followersData = res;
      this.followersData.forEach((e: any) => {
        this.incCount.push(e.janFollow);
        this.incCount.push(e.fabFollow);
        this.incCount.push(e.marchFollow);
        this.incCount.push(e.aprilFollow);
        this.incCount.push(e.mayFollow);
        this.incCount.push(e.juneFollow);
        this.instaFollowers.push(e.instaFollower.split(',').map((value: any) => parseFloat(value.trim())));
        this.facebookFollowers.push(e.facebookFollower.split(',').map((value: any) => parseFloat(value.trim())));
        this.twitterFollowers.push(e.twitterFollower.split(',').map((value: any) => parseFloat(value.trim())));
      });
      for(let i=0; i<this.instaFollowers.length; i++) {
        this.instaAvg = (this.instaAvg + this.instaFollowers[0][i]) / 5;
        this.faceBookAvg = (this.faceBookAvg + this.facebookFollowers[0][i]) / 5;
        this.twitterAvg = (this.twitterAvg + this.twitterFollowers[0][i]) /5;
      }      
      
      this.comboChart(this.incCount, this.instaFollowers[0], this.facebookFollowers[0], this.twitterFollowers[0]);
      this.lineChart(this.instaFollowers[0], this.facebookFollowers[0], this.twitterFollowers[0]);
    }) 
  }

  comboChart(incData: any, data1: any, data2: any, data3: any) {
    new Chart("combo", {
      type: 'bar',
      data: {
        labels: ['jan', 'fab', 'march', 'april', 'may', 'june'],
        datasets: [
          {
            label: 'Followers',
            data: incData,
            backgroundColor: 'rgba(255,99,132,0.2)',
            order: 1
          },
          {
            label: 'InstaGram',
            data: data1,
            borderColor: 'red',
            type: 'line',
            order: 0
          },
          {
            label: 'FaceBook',
            data: data2,
            borderColor: 'blue',
            type: 'line',
            order: 0
          },
          {
            label: 'Twitter',
            data: data3,
            borderColor: 'black',
            type: 'line',
            order: 0
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'All Social Media Followers'
          }
        }
      },
    })
  }

  lineChart(insta: any, facebook: any, twitter: any) {
    new Chart("line-chart", {
      type: 'line',
      data: {
        labels: ['jan', 'fab', 'march', 'april', 'may'],
        datasets: [
          {
            data: insta,
            label: "InstaGram",
            borderColor: "#e43202",
            backgroundColor: 'rgba(255,99,132,0.2)',
            fill: true,
            tension: 0.5
          },
          {
            data: facebook,
            label: "FaceBook",
            borderColor: "#0000FF",
            backgroundColor: 'rgb(173,216,230,0.2)',
            fill: true,
            tension: 0.5
          },
          {
            data: twitter,
            label: "Twitter",
            borderColor: "black",
            backgroundColor: 'rgb(128,128,128,0.2)',
            fill: true,
            tension: 0.5
          }
        ]
      },
      options: {
          plugins: {
              title: {
                  display: true,
                  text: 'Monthly Followers inc. Data'
              }
          }
      }
    });
  }

}
