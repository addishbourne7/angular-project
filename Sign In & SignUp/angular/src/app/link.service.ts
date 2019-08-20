import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../app/server/server';
import { Observable } from 'rxjs';
import { map } from 'rxjs/Operators';
import { Router } from '@angular/router';

export interface UserResponse {
  users : Users[]
}

@Injectable({
  providedIn: 'root'
})
export class LinkService {
 __url='http://localhost:5000';
 _url= 'http://localhost:5000/users';
 
  constructor(private _http:HttpClient,private routes: Router) { }  
  data: Users[];
  
  registers(userData){
    return this._http.post<any>(this.__url, userData);
   }
   getData(): Observable<Users[]>{
    return this._http.get<UserResponse>(this.__url)
      .pipe(
        map(({users} : UserResponse) => users)
      )
  }
  deleteRow(msg): Observable<UserResponse>{
    return this._http.delete<UserResponse>(`${this.__url}/${msg}`);
}
  sendEditData(data){
    return this._http.put<any>(this.__url, data);  
  }
  getToken(){
    return localStorage.getItem('token');
  } 
  loggedIn(){
    return !!localStorage.getItem('token'); 
  }
  logout(){
    return localStorage.removeItem('token');
    this.routes.navigate(['/main']);
  }



  register(userData){
    return this._http.post<any>(`${this._url}/signup`, userData);
  }

  login(loginData) {
    return this._http.post<any>(`${this._url}/signin`, loginData);
  }
  goggle(){
    return this._http.get<any>(`${this,this._url}/google`);
  }
}
