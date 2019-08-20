import { Component, OnInit, ViewChild,ViewContainerRef,ElementRef } from '@angular/core';
import { FormBuilder, FormControl,Validators,FormGroup,FormArray } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';
import { ServerService } from '../server/server.service'
import { Users } from '../server/server'
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as textMask from 'vanilla-text-mask/dist/vanillaTextMask.js';
import { Subscription, fromEvent } from 'rxjs';
import { MatDatepickerInput } from '@angular/material';




@Component({
  selector: 'app-main', 
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  today = new Date();

  minDate= new Date(1990,0,1);
  maxDate= new Date(this.today);
  eventSubscription: Subscription
  
 
   registratinForm=FormGroup;
   mask= [/\d/, /\d/, '/', /\d/, /\d/, '/',/\d/, /\d/,/\d/, /\d/];
   maskedInputController;

   @ViewChild('pickerInput', { read: ViewContainerRef }) public pickerInput;
   @ViewChild(MatDatepickerInput) datepickerInput: MatDatepickerInput<any>;
   @ViewChild('pickerInput') dateInput: ElementRef;

  constructor(private fb: FormBuilder,private _registrationService: RegistrationService,private _serverService: ServerService, private router: Router) { }
 
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
    this._registrationService.register(this.registrationForm.value)
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
    this._registrationService.sendEditData(this.registrationForm.value).subscribe(); 
  }
  
  ngAfterViewInit(): void {
    setTimeout(() => {
    this.maskedInputController = textMask.maskInput({
    inputElement: this.pickerInput.element.nativeElement,
    mask: this.mask
    });
    this.eventSubscription = fromEvent(this.dateInput.nativeElement, 'input').subscribe(_ => {
    this.datepickerInput._onInput(this.dateInput.nativeElement.value);
    });
    });
   }
    
   ngOnDestroy() {
    this.maskedInputController.destroy();
   }
}
