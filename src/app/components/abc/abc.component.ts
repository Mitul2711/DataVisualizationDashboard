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
      console.log(this.instaFollowers);
      
      this.comboChart(this.incCount, this.instaFollowers[0], this.facebookFollowers[0], this.twitterFollowers[0]);
    }) 
  }

  comboChart(incData: any, data1: any, data2: any, data3: any) {
    new Chart("combo", {
      type: 'bar',
      data: {
        labels: ['jan', 'fab', 'march', 'april', 'may', 'june'],
        datasets: [
          {
            label: 'Dataset 1',
            data: incData,
            backgroundColor: 'rgba(255,99,132,0.2)',
            order: 1
          },
          {
            label: 'Dataset 2',
            data: data1,
            borderColor: 'red',
            type: 'line',
            order: 0
          },
          {
            label: 'Dataset 2',
            data: data2,
            borderColor: 'blue',
            type: 'line',
            order: 0
          },
          {
            label: 'Dataset 2',
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
            text: 'Chart.js Combined Line/Bar Chart'
          }
        }
      },
    })
  }

}
