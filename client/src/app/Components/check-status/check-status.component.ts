import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Complaint } from 'src/app/models/complaint';
import { ComplaintService } from 'src/app/services/complaint.service';

@Component({
  selector: 'app-check-status',
  templateUrl: './check-status.component.html',
  styleUrls: ['./check-status.component.css'],
})
export class CheckStatusComponent {
  complaint: Complaint[];
  ansComplaint: Complaint[];
  email = '';

  constructor(
    private complaintService: ComplaintService,
    private router: Router
  ) {}
  ngOnInit() {
    this.getComplaint();
  }

  getComplaint() {
    this.complaintService.GetComplaint().subscribe((res) => {
      this.complaint = res;
    });
  }

  submit() {
    // console.log(this.email);
    let k = 0;
    this.ansComplaint = [];
    for (let i = 0; i < this.complaint.length; i++) {
      if (this.complaint[i].email === this.email) {
        this.ansComplaint.push(this.complaint[i]);
      }
    }
    if (this.ansComplaint.length === 0) {
      let obj = new Complaint();
      obj._id = 'User Not Exist';
      obj.name = 'User Not Exist';
      obj.email = 'User Not Exist';
      obj.description = 'User Not Exist';
      obj.status = 'User Not Exist';
      this.ansComplaint.push(obj);
      window.alert("User Not Available")
    }

    console.log(this.ansComplaint.length);
  }
}
