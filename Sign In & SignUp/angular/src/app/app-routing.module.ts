import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ServerComponent } from './server/server.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'main', component: MainComponent},
  { path: 'profile/:element.id', component: ProfileComponent,canActivate: [AuthGuard] },
  { path: 'server', component: ServerComponent,canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent,canActivate: [AuthGuard]},
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
