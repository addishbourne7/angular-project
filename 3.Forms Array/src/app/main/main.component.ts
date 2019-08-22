import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, FormArray } from '@angular/forms';
import { DataSource } from '@angular/cdk/table';
import { Users } from './main';
import { HAMMER_LOADER } from '@angular/platform-browser';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  registrationForm: FormGroup;
  displayedColumns: string[] = ['name', 'age', 'city','state'];
  // dataSource = this.registrationForm.value.items;
  dataSource: Users[];
  test: boolean;

  ngOnInit() {
    this.registrationForm = this.fb.group({ 
      
      items: this.fb.array([])
      
    })
  
  this.addItem();
  
  }
  
  get itemforms() {
    return this.registrationForm.get('items') as FormArray
  }
  
  addItem() {
  
    const item = this.fb.group({ 
      name: [],
      age: [],
      city: [],
      state: []
    })
  
    this.itemforms.push(item);
  }
  
  deleteItem(i) {
    this.itemforms.removeAt(i)
    if(this.test){
      this.dataSource=this.registrationForm.value.items;
    }
  
  }
  submit(){
    console.log(this.registrationForm.value);
    this.dataSource =this.registrationForm.value.items;
    this.test=true;
  }
}
