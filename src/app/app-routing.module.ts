import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetHelloComponent } from './get-hello/component/get-hello.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthTestComponent } from './auth-test/component/auth-test.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';



const routes: Routes = [
  // {path: '', redirectTo: '/get-hello', pathMatch: 'full' },
  {path: '', component: HomeComponent},
  {path: 'get-hello', component: GetHelloComponent},
  {path: 'auth-test', component: AuthTestComponent},
  {path: 'profile-page', component: ProfilePageComponent},
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
