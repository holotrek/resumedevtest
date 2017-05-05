// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { AuthGuard } from './auth.guard'

// Components
import { AppComponent } from '../components/app/app.component';
import { MenuComponent } from '../components/menu/menu.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { LoginComponent } from '../components/login/login.component';
import { DirectoryListComponent } from '../components/directory/directory-list.component';

const appRoutes: Routes = [{
  path: '',
  redirectTo: '/dashboard',
  pathMatch: 'full'
},
{
  path: 'dashboard',
  component: DashboardComponent
},
{
  path: 'login/:redirect',
  component: LoginComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'dirlist',
  component: DirectoryListComponent,
  canActivate: [
    AuthGuard
  ]
}];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule { }
