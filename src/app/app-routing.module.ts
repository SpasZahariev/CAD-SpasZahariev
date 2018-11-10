import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/component/dashboard-page.component';
import { LoginPageComponent } from './login-page/component/login-page.component';
import { UserPageComponent } from './user-page/component/user-page.component';
import { AuthGuardService } from './common/services/auth-guard.service';
import { EmailPageComponent } from './email-page/component/email-page.component';



const routes: Routes = [
  // {path: '', redirectTo: '/get-hello', pathMatch: 'full' },
  {path: '', component: LoginPageComponent},
  {path: 'login-page', component: LoginPageComponent},
  {path: 'dashboard-page', component: DashboardPageComponent, canActivate: [AuthGuardService]},
  {path: 'user-page', component: UserPageComponent, canActivate: [AuthGuardService]},
  {path: 'email-page', component: EmailPageComponent, canActivate: [AuthGuardService]},
  {path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})


export class AppRoutingModule {
 }
