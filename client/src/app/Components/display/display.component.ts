import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private complaintService: ComplaintService){};
  ngOnInit(){
    this.complaintService.GetComplaint().subscribe(res=>{
      this.complaint=res;
    })
  }
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

}
