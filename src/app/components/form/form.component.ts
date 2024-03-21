import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormDetailsService } from 'src/app/services/form-details.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  detailsForm: FormGroup;

  constructor(private fb: FormBuilder, private formService: FormDetailsService) {
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
      instaFollower: [''],
      facebookFollower: [''],
      twitterFollower: [''],
    })
  }

  formDetails: any;

  ngOnInit(): void {
    
  }

  onSubmit() {
    this.formDetails = this.detailsForm.value;
    this.formService.postData(this.formDetails).subscribe(() => {});  
    this.detailsForm.reset();
  }
  

}
