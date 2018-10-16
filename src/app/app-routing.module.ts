import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './home/app.component';
import { GetHelloComponent } from './get-hello/get-hello.component';



const routes: Routes = [
  {path: '', redirectTo: '/get-hello', pathMatch: 'full' },
  {path: 'a', component: AppComponent},
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
