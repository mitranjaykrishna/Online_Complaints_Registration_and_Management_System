import { Component} from '@angular/core';
// import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Complaint } from 'src/app/models/complaint';
import { ComplaintService } from 'src/app/services/complaint.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  
  complaint: Complaint;

  constructor(private complaintService: ComplaintService,private router: Router){
    this.complaint=new Complaint();
  }

  onSubmit(userPost: NgForm){
    if(userPost.valid){
    this.complaintService.AddComplaint(this.complaint).subscribe(res =>{
      if(res.status===201){
        this.router.navigate(['/login']);
      }
    })
  }
  }

}
