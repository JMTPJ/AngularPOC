import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class HttpsService {
  apiUrl = environment.baseUrl+'api';
  constructor(
    private http: HttpClient
  ) { }
  /**
   * @description this will get the details by the URL passed to it.
   * @createdOn 2022-06-09T11:08:59
   * @param url 
   * @returns data from backend.
   */
  get(url: string) {
    console.log(url);
    return this.http.get<any>(this.apiUrl + url)
  }
  /**
   * @description this will get the details by the URL & ID passed to it.
   * @createdAT 2022-06-09T12:07:55
   * @param url 
   * @param id 
   * @returns data from backend.
   */
  getById(url: string, id: number) {
    return this.http.get<any>(this.apiUrl + url + '/' + id)
  }
  /**
   * @description this will post the details by the URL & model passed to it.
   * @createdAT 2022-06-09T12:10:29
   * @param url 
   * @param model 
   * @returns responce from backend.
   */
  post(url: string, model: any) {
    return this.http.post<any>(this.apiUrl + url, model);
  }
  /**
   * @description this will put the details by the URL & model passed to it.
   * @createdAT 2022-06-15T17:41:15 
   * @param url 
   * @param model 
   * @returns responce from backend.
   */
  put(url: string, model: any) {
    return this.http.put<any>(this.apiUrl + url, model);
  }
  /**
   * @description this will update the details by the URL & model passed to it.
   * @createdAT 2022-06-09T12:12:03
   * @param url 
   * @param model 
   * @returns responce from backend.
   */
  update(url: string, model: any) {
    return this.http.put<any>(this.apiUrl + url, model);
  }
  /**
   * @description this will delete the details by the URL & model passed to it.
   * @createdAT 2022-06-09T12:12:03
   * @param url 
   * @param model 
   * @returns responce from backend.
   */
  delete(url: string, model: any) {
    return this.http.delete<any>(this.apiUrl + url, model);
  }
  /**
   * @description this will delete the details by the URL & id passed to it.
   * @createdAT 2022-06-09T12:12:03
   * @param url 
   * @param id
   * @returns responce from backend.
   */
  deleteById(url: string, id: any) {
    return this.http.delete<any>(this.apiUrl + url + '/' + id);
  }
}