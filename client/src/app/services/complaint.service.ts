import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Complaint } from '../models/complaint';
import { environment as env } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  headers:HttpHeaders;
  constructor(private client:HttpClient) { 
    this.headers=new HttpHeaders({'content-type':'application/json'})
  }

  GetComplaint(): Observable<Complaint[]> {
    return this.client.get<Complaint[]>(env.apiAddress+'/complaintGet');
  }

  AddComplaint(complaint: Complaint): Observable<HttpResponse<any>>{
    return this.client.post(env.apiAddress+'/complaintSave',JSON.stringify(complaint),{
      headers: this.headers,observe:'response'
    });
  }

  DeleteComplaint(id:string):Observable<HttpResponse<any>>{
    return this.client.delete<HttpResponse<any>>(env.apiAddress+'/complaintDelete/'+id,{observe:'response'});
  }
}
