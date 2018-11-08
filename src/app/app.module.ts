import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './app.material.module';
import { AuthorizationService } from './common/services/authorization.service';
import { ToolbarComponent } from './common/toolbar/component/toolbar.component';
import { DashboardPageComponent } from './dashboard-page/component/dashboard-page.component';
import { ProjectCardComponent } from './dashboard-page/project-card/component/project-card.component';
import { ProjectTableComponent } from './dashboard-page/project-table/component/project-table.component';
import { UserTableComponent } from './dashboard-page/user-table/component/user-table.component';
import { GetHelloComponent } from './get-hello/component/get-hello.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/component/login-page.component';
import { UserPageComponent } from './user-page/component/user-page.component';
import { UserFormComponent } from './user-page/user-form/component/user-form.component';
import { UserSelectorComponent } from './user-page/user-selector/component/user-selector.component';
import { CookieService } from 'ngx-cookie-service';



@NgModule({
  declarations: [
    AppComponent,
    GetHelloComponent,
    HomeComponent,
    LoginPageComponent,
    DashboardPageComponent,
    UserTableComponent,
    ProjectTableComponent,
    ProjectCardComponent,
    UserPageComponent,
    ToolbarComponent,
    UserSelectorComponent,
    UserFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  providers: [
    AuthorizationService,
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
