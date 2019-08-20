import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';
import { LinkService } from '../link.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css',]
})
export class MainComponent implements OnInit {
  durationInSeconds = 3;


   check: boolean = false;
   constructor(private fb: FormBuilder,private fbb:FormBuilder,private _linkService: LinkService,private _snackBar: MatSnackBar,private routes: Router) { }
   signupForm=this.fb.group({
     name: [''],
     email:[''],
     password:['']
   })
   signinForm=this.fbb.group({
     email:[''],
     password:['']
   })

  fun(check){  
    this.check= check;
  }
  onSignUp(){
    console.log(this.signupForm.value);
    this._linkService.register(this.signupForm.value)
    .subscribe(
      response => {
        console.log(response)
        localStorage.setItem('token',response.token)
        this.routes.navigate(['/profile'])
      },
      error => this.openSnackBar('Error', error.error.message),
    
    )
  }
  onSignIn(){
    console.log(this.signinForm.value);
    this._linkService.login(this.signinForm.value)
    .subscribe(
      response => {
        console.log(response)
        localStorage.setItem('token',response.token)
        this.routes.navigate(['/profile'])
      }, 
      error => this.openSnackBar('Error', error.error.message),
    )
  }
   signupgoogle(){
     console.log('google');
       this._linkService.goggle().subscribe(res=>{
         console.log('data here');
       })
   }

  openSnackBar(message: string, action: string){
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });
  }
 
  


  ngOnInit() {
    
  }

}
