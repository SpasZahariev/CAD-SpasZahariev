import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './app.material.module';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { GetHelloComponent } from './get-hello/component/get-hello.component';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { AuthTestComponent } from './auth-test/component/auth-test.component';
import { ProfilePageComponent } from './profile-page/component/profile-page.component';
import { ProjectTableComponent } from './profile-page/project-table/component/project-table.component';
import { UserTableComponent } from './profile-page/user-table/component/user-table.component';

@NgModule({
  declarations: [
    AppComponent,
    GetHelloComponent,
    HomeComponent,
    AuthTestComponent,
    ProfilePageComponent,
    UserTableComponent,
    ProjectTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AmplifyAngularModule,
  ],
  providers: [
    AmplifyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
