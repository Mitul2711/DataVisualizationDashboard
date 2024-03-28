import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { Router } from '@angular/router';
import { FormDetailsService } from 'src/app/services/form-details.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(private route: Router, private formService: FormDetailsService) {}

  ngOnInit(): void {
    
  }

  toggleBtn() {
    this.formService.btn = !this.formService.btn;
  }

  onForm() {
    this.route.navigate([''])
  }


}
