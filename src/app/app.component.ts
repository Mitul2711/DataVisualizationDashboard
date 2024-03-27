import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DataVisualizationDashboard';

  @Input() btn: any;

  onClose() {
    this.btn = false;
  }

}
