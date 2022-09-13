import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
export class RestService {
  @Injectable({
    providedIn: 'root',
  })
  readonly BaseUrl = environment.baseUrl + 'api';

  constructor(private http: HttpClient) {
    
  }

  GET(url: string, params?: HttpParams): Observable<any> {
    const requestUrl = `${this.BaseUrl}/${url}`;
    return this.http.get<any>(requestUrl, { params: params });
  }

  POST(url: string, body:any, options?: any): Observable<any> {
    const requestUrl = `${this.BaseUrl}/${url}`;
    return this.http.post(requestUrl, body, options);
  }

  PATCH(url: string, body:any): Observable<any> {
    const requestUrl = `${this.BaseUrl}/${url}`;
    return this.http.patch(requestUrl, body);
  }

  DELETE(url: string): Observable<any> {
    const requestUrl = `${this.BaseUrl}/${url}?id=`;
    return this.http.delete(requestUrl);
  }

  PUT(url: string, body:any): Observable<any> {
    const requestUrl = `${this.BaseUrl}/${url}`;
    return this.http.put(requestUrl, body);
  }

  // private handleError(err: HttpErrorResponse, _this: any) {
  //   if (err.error && err.error.result) {
  //     var errorResult = err.error.result.errors[0];
  //     console.log('http error occurred');
  //     console.log(err.message);
  //     let errMsg = (errorResult.message || '').toString();
  //     let isInvalid = errMsg.toLocaleLowerCase().includes('invalid id');
  //     if (isInvalid) {
  //       _this.router.navigate(['app/invalid-page']);
  //     } else {
  //       console.log(errorResult.message);
  //       return throwError(errorResult);
  //     }
  //   } else {
  //     console.log('http error occurred');
  //     console.log(err.message);
  //     return throwError(err);
  //   }
  // }
}