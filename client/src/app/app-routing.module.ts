import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './Components/form/form.component';
import { DisplayComponent } from './Components/display/display.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { CheckStatusComponent } from './Components/check-status/check-status.component';
import { RegistrationComponent } from './Components/registration/registration.component';

const routes: Routes = [
  {
    path:"",component: FormComponent
  }
  ,
  {
    path:'check', component: CheckStatusComponent
  },
  {
    path:'display', component: DisplayComponent
  },
  {
    path:'login', component: LoginComponent
  },
  {
    path:'signup', component: RegistrationComponent
  },
  {
    path:'search/:query',
    component:CheckStatusComponent
  }
  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
