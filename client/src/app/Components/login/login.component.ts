import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email:"aa@gmail.com"
  password:"12345";

  login:Login;

  constructor(private route:Router){
    this.login=new Login();
  }

  onLogin(loginPost:NgForm)
  {
    if(loginPost.valid)
     {
      if(this.login.email==="admin" && this.login.password=="admin")
      // {
        this.route.navigate(['/display']);
      // }
      // else console.log("failedlog")

      console.log(this.login.password);
     }
  }

}
