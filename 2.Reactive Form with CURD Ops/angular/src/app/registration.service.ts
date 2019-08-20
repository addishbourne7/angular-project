import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../app/server/server';
import { Observable } from 'rxjs';
import { map } from 'rxjs/Operators';

export interface UserResponse {
  users : Users[]
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
   _url = 'http://localhost:5500/users';
  constructor(private _Http:HttpClient) { }
  data: Users[];
  register(userData){
   return this._Http.post<any>(this._url, userData);
  }
  
  getData(): Observable<Users[]>{
    return this._Http.get<UserResponse>(this._url)
      .pipe(
        map(({users} : UserResponse) => users)
      )
  }
  deleteRow(msg): Observable<UserResponse>{
    return this._Http.delete<UserResponse>(`${this._url}/${msg}`);
}
  sendEditData(data){
    return this._Http.put<any>(this._url, data);  
  }
  
  

  
}
