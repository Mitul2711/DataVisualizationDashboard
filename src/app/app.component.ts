import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormDetailsService } from './services/form-details.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'DataVisualizationDashboard';

  constructor(private formService: FormDetailsService) {}

  ngOnInit(): void {

  }



}
