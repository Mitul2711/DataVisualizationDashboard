import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { easingEffects } from 'chart.js/helpers';

@Component({
  selector: 'app-progression',
  templateUrl: './progression.component.html',
  styleUrls: ['./progression.component.scss']
})
export class ProgressionComponent implements OnInit {

  animation: any;

  constructor() { }

  ngOnInit(): void {
    this.getForData()
    const easing = easingEffects.easeOutQuad;
    const totalDuration = 5000;

    const duration = (ctx: any) => easing(ctx.index / this.data.length) * totalDuration / this.data.length;
    const delay = (ctx: any) => easing(ctx.index / this.data.length) * totalDuration;

    const previousY = (ctx: any) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;

    this.animation = {
      x: {
        type: 'number',
        easing: 'linear',
        duration: duration,
        from: NaN, 
        delay(ctx: any) {
          if (ctx.type !== 'data' || ctx.xStarted) {
            return 0;
          }
          ctx.xStarted = true;
          return delay(ctx);
        }
      },
      y: {
        type: 'number',
        easing: 'linear',
        duration: duration,
        from: previousY,
        delay(ctx: any) {
          if (ctx.type !== 'data' || ctx.yStarted) {
            return 0;
          }
          ctx.yStarted = true;
          return delay(ctx);
        }
      }
    };

    this.chart();
    this.doughnet();

  }

  data: any[] = [];
  data2: any[] = [];
  prev: any = 10;
  prev2: any = 8;
  insta: any[] = [];

  getForData() {
    for (let i = 0; i < 180; i++) {
      this.prev += 5 - Math.random() * 10;
      this.data.push({ x: i, y: this.prev });
      this.prev2 += 5 - Math.random() * 10;
      this.data2.push({ x: i, y: this.prev2 });
    }
  }


  chart() {
    new Chart('progression', {
      type: 'line',
      data: {
        labels: Array.from(Array(this.data.length), (_, i) => (i + 1).toString()), 
        datasets: [{
          label: 'My Dataset',
          data: this.data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0,
        }]
      },
      options: {
        animation: this.animation,
        interaction: {
          intersect: false
        },
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Progression Chart'
          }
        },
        scales: {
          x: {
            ticks: {
              display: true
            },
            grid: {
              display: true 
            }
          },
          y: {
            ticks: {
              display: true
            },
            grid: {
              display: true
            }
          }
        }
      }
    });
  }

  doughnet() {
    new Chart('doughnet', {
      type: 'doughnut',
      data: {
        labels: ['followers', 'non-followers'],
        datasets: [
          {
            data: [60,40],
            backgroundColor: ['rgba(255, 0, 0, 0.7)', 'rgba(255, 0, 0, 0.3)']
          },
        ]
      }
    });
  }

}
