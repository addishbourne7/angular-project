import { Injectable } from '@angular/core';
import { LinkService } from '../link.service';
import { Users } from './server';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  editData : Users;

  storeEditData(element){
    this.editData = element;
  }
  getEditData(){
    return this.editData;
  }
  constructor() { }
}
