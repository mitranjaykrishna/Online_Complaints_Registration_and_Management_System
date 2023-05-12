import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment as env } from 'src/environments/environment.development';
// import { Login } from 'src/app/models/login';
// import { ComplaintService } from 'src/app/services/complaint.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  regForm: FormGroup;

  constructor(private http: HttpClient, private route: Router) {
    this.regForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
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

  onSubmit(details = { email: String, password: String }): void {
    this.http.post(env.apiAddress+"/signin", details).subscribe(
      (response: any) => {
        console.log(response)
        if(response && response.user._id){
          localStorage.setItem('userId',response.user._id)
        }
       {
          this.route.navigate(['/display']);
          localStorage.setItem('adminJwtToken', response.jwtTtoken);
          window.alert('Admin Login Successfully!');
        }
      },
      (error) => {
        console.error(error);
        window.alert('Login failed!');
      }
    );
  }

}
