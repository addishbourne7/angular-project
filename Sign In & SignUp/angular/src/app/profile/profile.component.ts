import { Component, OnInit, ViewChild,ViewContainerRef,ElementRef } from '@angular/core';
import { FormBuilder, FormControl,Validators,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LinkService } from '../link.service';
import { ServerService } from '../server/server.service';
import { Users } from '../server/server';
import * as textMask from 'vanilla-text-mask/dist/vanillaTextMask.js';
import { Subscription, fromEvent } from 'rxjs';
import { MatDatepickerInput } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  today = new Date();

  minDate= new Date(1990,0,1);
  maxDate= new Date(this.today);
  eventSubscription: Subscription
 
  registratinForm=FormGroup;
 

 

  constructor(private fb: FormBuilder,private _linkService :LinkService,private _serverService :ServerService, private router: Router) { }
 
  registrationForm =this.fb.group({
    firstName: new FormControl('',Validators.required),
    lastName:  new FormControl('',Validators.required),
    dateOfBirth: new FormControl(''),
    id: ('')
  })

  editValues: Users;
  editBool: boolean;
  ngOnInit() {
    console.log('edit', this._serverService.getEditData());
    if(this._serverService.getEditData()) {
      this.editBool = true;
      this.editValues = this._serverService.getEditData();
      this.editDataPopulate();
    }
  }
  onSubmit(){
    console.log(this.registrationForm.value);
    
    this.registrationForm.value.id = undefined;
    this._linkService.registers(this.registrationForm.value)
    .subscribe(
      response =>console.log('sucess!',response),
      error => console.error('error', error)
      
    );
  }
    
    
  
  editDataPopulate(){
    console.log('ree', this.registrationForm.controls.firstName.value);
    this.registrationForm.get('firstName').setValue(this.editValues.firstName);
    this.registrationForm.get('lastName').setValue(this.editValues.lastName);
    this.registrationForm.get('id').setValue(this.editValues.id);
  }
  storeEditData(){
    console.log('this.registrationForm.value-------',this.registrationForm.value);
    this._linkService.sendEditData(this.registrationForm.value).subscribe(); 
  }
  getAllData(){
    this._linkService.getData().subscribe(res=>{
      this.router.navigate(['server']);
      console.log('data',res);
     });
  }
  logout(){
    this.router.navigate(['/main']);
    return localStorage.removeItem('token');
  }
  
       
   
   
}
  
