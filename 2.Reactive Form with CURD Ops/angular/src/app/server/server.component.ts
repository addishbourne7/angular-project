import { Component, OnInit,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistrationService } from '../registration.service';
import { Users } from './server';
import { MatTableDataSource } from '@angular/material';
import { tap } from 'rxjs/Operators';
import { Router } from '@angular/router';
import { ServerService } from './server.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from './dialog-overview-example-dialog.component';





@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
   server : Array<Users>;
   data : Array<Users>;
  //  public popoverTitle: string ="delete";
  //  public popoverMessage: string ="Are you sure you want to Delete";
  //  public confirmClicked: boolean;
  //  public cancelClicked: boolean;
   
   displayedColumns: string[] = ['id', 'firstName', 'lastName','dateOfBirth','options'];
   dataSource : Users[];
  
  

  constructor(private http: HttpClient,private _registrationService: RegistrationService,private _serverService: ServerService,private router: Router,public dialog: MatDialog) { }
  delete(element){
    console.log("öne row deleted");
    this._registrationService.deleteRow(element.id).subscribe(
      (res) =>{
       this._registrationService.getData().subscribe(res=>{
        this.data = res;
        this.dataSource = (this.data);
      })
    },
      err => console.log(err)
    );
  }
  openDialog(element:Users): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {...element}
    });
    dialogRef.afterClosed().subscribe((user: Users) => {
      if(user)
        this.delete(user);
    });

    
  }

  edit(element) {
    console.log('data--------',element);
    this._serverService.storeEditData(element);
    this.router.navigate(['main',element.id]);
  }
  

  ngOnInit() {
    
    
     this._registrationService.getData()
      .pipe(
      )
      .subscribe((data: Users[]) => this.dataSource = data); 
     
  }
  

}

  


