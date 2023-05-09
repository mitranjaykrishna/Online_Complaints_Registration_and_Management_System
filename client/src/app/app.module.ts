import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//http requests
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { FormComponent } from './Components/form/form.component';
import { DisplayComponent } from './Components/display/display.component';
import { ComplaintService } from './services/complaint.service';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FormComponent,
    DisplayComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [ComplaintService],
  bootstrap: [AppComponent]
})
export class AppModule { }
