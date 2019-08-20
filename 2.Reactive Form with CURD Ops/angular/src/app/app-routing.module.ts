import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServerComponent } from './server/server.component'; 
import { MainComponent } from './main/main.component';
 

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full'},
  { path: 'main/:element.id', component: MainComponent},
  { path: 'main', component: MainComponent},
  { path: 'server',component: ServerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComPonents = [ServerComponent]
