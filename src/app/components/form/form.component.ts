import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  detailsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.detailsForm = this.fb.group({
      name: [''],
      email: [''],
      janFollow: [''],
      fabFollow: [''],
      marchFollow: [''],
      aprilFollow: [''],
      mayFollow: [''],
      juneFollow: [''],
      male: [''],
      female: [''],
      followNo0: [''],
      followNo5: [''],
      followNo10: [''],
      followNo15: [''],
      follow20: [''],
     
    })
  }

  ngOnInit(): void {

  }
  

}
