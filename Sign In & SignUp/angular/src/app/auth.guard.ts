import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LinkService } from '../app/link.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  durationInSeconds = 5;
  constructor(private _linkedService: LinkService,private router: Router,private _snackBar: MatSnackBar){ }
   canActivate(): boolean {
     if(this._linkedService.loggedIn())
     return true
     else{
        this.router.navigate(['/main'])
        this.openSnackBar('Error','please SignIn at first')
       return false 
     }
   }
   openSnackBar(message: string, action: string){
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });
  }
  
}
