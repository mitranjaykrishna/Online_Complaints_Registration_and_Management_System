import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment as env } from 'src/environments/environment.development';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  regForm: FormGroup;
  rootcode='';

  constructor(private http:HttpClient, private route:Router) {
    this.regForm  = new FormGroup({
      firstname:new FormControl(null,Validators.required),
      lastname:new FormControl(null,Validators.required),
      username:new FormControl(null,Validators.required),
      email:new FormControl(null,Validators.required),
      password:new FormControl(null,Validators.required),
    })
    const jwtToken = localStorage.getItem('adminJwtToken')
    if (jwtToken){
      this.route.navigate(['/admin/home'])
    }
    const token = localStorage.getItem("jwtToken")
    if (token) {
      this.route.navigate(['/home'])
    }
   }

   onSubmit(details: { firstname: string, lastname: string, username: string, email: string, password: string }): void {
    this.http.post(env.apiAddress+"/signup", details).subscribe((response) => {
        console.log(this.rootcode);
        window.alert('Registered Successfully!');
        this.route.navigate(['/login']);
    }, error => {
        window.alert('Registration Failed!');
        console.log(error);
    });
}
}
