import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Complaint } from 'src/app/models/complaint';
import { ComplaintService } from 'src/app/services/complaint.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent {

  complaint: Complaint[];
  public isAdmin = false;


  constructor(private complaintService: ComplaintService,private router: Router){
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.isAdmin = false;
      localStorage.removeItem('adminJwtToken');
    }
    const jwtToken = localStorage.getItem('adminJwtToken');
    if (jwtToken) {
      localStorage.removeItem('jwtToken');
      this.isAdmin = true;
    }

  };
  ngOnInit(){
    this.getComplaint();


    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.isAdmin = false;
      localStorage.removeItem('adminJwtToken');
    }
    const jwtToken = localStorage.getItem('adminJwtToken');
    if (jwtToken) {
      localStorage.removeItem('jwtToken');
      this.isAdmin = true;
    }
  }

  getComplaint(){
    this.complaintService.GetComplaint().subscribe(res=>{
      this.complaint=res;
    })
  }

  //del
  deleteComplain(id:any)
  {
    if(confirm("Are You Sure To Delete"))
    {
     this.complaintService.DeleteComplaint(id).subscribe(res=>{
      if(res.status===200)
      {
        for(let i=0;i<this.complaint.length;i++)
        {
          if(id===this.complaint[i]._id)
          {
            this.complaint.splice(i,1);
            break;
          }
        }
      }
     })
    }
  }

  //solve
  solveComplain(id:any)
  {
    if(confirm("Are You Sure To Set Solved"))
    {
     this.complaintService.SolvedComplain(id).subscribe(res=>{
      if(res.status==201)  // edit need
      {
        for(let i=0;i<this.complaint.length;i++)
        {
          if(id===this.complaint[i]._id)
          {
            this.complaint[i].status="Solved";
            break;
          }
        }
      }
     })
    }
  }

  //Pending
  processingComplain(id:any)
  {
    if(confirm("Are You Sure To Set Processing"))
    {
     this.complaintService.ProcessingComplain(id).subscribe(res=>{
      if(res.status==201)  // edit need
      {
        for(let i=0;i<this.complaint.length;i++)
        {
          if(id===this.complaint[i]._id)
          {
            this.complaint[i].status="Processing";
            break;
          }
        }
      }
     })
    }
  }

  onLogout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('adminJwtToken');
    window.alert('Logout Successful!');
    this.router.navigate(['/']);
    this.isAdmin = false;
  }

  // onSubmit(userPost: NgForm){
  //   if(userPost.valid){
  //   this.complaintService.AddComplaint(this.complaint).subscribe(res =>{
  //     if(res.status===201){
  //       this.router.navigate(['/login']);
  //     }
  //   })
  // }
  // }

}
