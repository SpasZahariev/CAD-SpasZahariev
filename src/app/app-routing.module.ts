import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetHelloComponent } from './get-hello/component/get-hello.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  // {path: '', redirectTo: '/get-hello', pathMatch: 'full' },
  {path: '', component: HomeComponent},
  {path: 'get-hello', component: GetHelloComponent},
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
