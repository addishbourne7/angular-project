import { Component, OnInit,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from './server';
import { LinkService } from '../link.service';
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

  displayedColumns: string[] = ['id', 'firstName', 'lastName','dateOfBirth','options'];
   dataSource : Users[];
  constructor(private http: HttpClient,private _linkService: LinkService,private _serverService: ServerService,private router: Router,public dialog: MatDialog) { }
  
  delete(element){
    console.log("öne row deleted");
    this._linkService.deleteRow(element.id).subscribe(
      (res) =>{
       this._linkService.getData().subscribe(res=>{
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
    this.router.navigate(['profile',element.id]);
  }
  

  ngOnInit() {
    
    
     this._linkService.getData()
      .pipe(
      )
      .subscribe((data: Users[]) => this.dataSource = data); 
     
  }
  profile(){
    this.router.navigate(['/profile']);
  }
  logout(){
    this.router.navigate(['/main']);
    console.log('user logout');
    return localStorage.removeItem('token');
    
  }
  

}




