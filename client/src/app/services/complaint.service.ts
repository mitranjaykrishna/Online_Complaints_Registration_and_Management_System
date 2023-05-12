import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Complaint } from '../models/complaint';
import { environment as env } from 'src/environments/environment.development';
import { Login } from '../models/login';


@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  headers:HttpHeaders;
  login:HttpHeaders;
  constructor(private client:HttpClient) { 
    this.headers=new HttpHeaders({'content-type':'application/json'});
    this.login=new HttpHeaders({'content-type':'application/json'});
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

  ProcessingComplain(id:string):Observable<HttpResponse<any>>{
    return this.client.put<HttpResponse<any>>(env.apiAddress+'/complaintProcessingPut/'+id,{observe:'response'});
  }

  SolvedComplain(id:string):Observable<HttpResponse<any>>{
    return this.client.put<HttpResponse<any>>(env.apiAddress+'/complaintSolvedPut/'+id,{observe:'response'});
  }

  // LoginAdmin(login:Login):Observable<HttpResponse<any>>{
  //   return this.client.post(env.apiAddress+'/admin',JSON.stringify(login),{
  //     login:this.login,observe:'response'
  //   })
  // }

  // GetConditiont(email:string): Observable<Complaint[]> {
  //   return this.client.get<Complaint[]>(env.apiAddress+'/complaintGet'+email);
  // }

  
}
