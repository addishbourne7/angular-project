import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';
import { ServerService } from './server/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
   constructor(private fb: FormBuilder,private _registrationService: RegistrationService,private _serverService: ServerService, private router: Router ){}
  //  registrationForm =this.fb.group({
  //    firstName: [''],
  //    lastName: ['']
  //  })

  
  //onSubmit(){
  //   console.log(this.registrationForm.value);
  //   this._registrationService.register(this.registrationForm.value)
  //   .subscribe(
  //     response =>console.log('sucess!',response),
  //     error => console.error('error', error)
      
  //   );
  // }
   getAllData(){
     this._registrationService.getData().subscribe(res=>{
       this.router.navigate(['server']);
       
       console.log('data',res);
      
     });
   }
   
}
