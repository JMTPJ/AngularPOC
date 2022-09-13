import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Patient } from '../models/patient';


@Injectable({
  providedIn: 'root',
})
export class PatientService {
     readonly BaseUrl = environment.baseUrl + 'api';
     constructor(private http: HttpClient) {
    
    }
  getPatients(params:HttpParams) {
    const requestUrl = `${this.BaseUrl}/Patient/GetAll`;  
    return this.http.get<any>(requestUrl, {params: params })
  }
  CreatePatient(patient:Patient) {
    const requestUrl = `${this.BaseUrl}/Patient/Create`;
    return this.http.post(requestUrl, patient)
  }
  UpdatePatient(patient:Patient) {
    const requestUrl = `${this.BaseUrl}/Patient/Update`;
    return this.http.put(requestUrl, patient)
  }
  
  deletePatient(id:number) {
    const requestUrl = `${this.BaseUrl}/Patient/Delete?id=`+id;
    return this.http.delete(requestUrl)
  }
}
