import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetHelloComponent } from './get-hello/component/get-hello.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserPageComponent } from './user-page/component/user-page.component';
import { LoginPageComponent } from './login-page/component/login-page.component';
import { DashboardPageComponent } from './dashboard-page/component/dashboard-page.component';



const routes: Routes = [
  // {path: '', redirectTo: '/get-hello', pathMatch: 'full' },
  {path: '', component: HomeComponent},
  {path: 'get-hello', component: GetHelloComponent},
  {path: 'login-page', component: LoginPageComponent},
  {path: 'dashboard-page', component: DashboardPageComponent},
  {path: 'user-page', component: UserPageComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})


export class AppRoutingModule {
 }
