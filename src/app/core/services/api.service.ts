import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public accessToken: any = '';
  public userData: any = '';

  constructor(
    private httpClient: HttpClient
  ) {
    this.setStorageData();
  }

  setLocalStorageData(): void {
    this.accessToken = localStorage.getItem('accessToken')
    let userInfo: any = localStorage.getItem('userInfo');
    if (this.accessToken) {
      sessionStorage.setItem('accessToken', this.accessToken)
    }
    if (userInfo) {
      sessionStorage.setItem('userInfo', userInfo);
    }
    this.setStorageData();
  }

  setStorageData(): void {
    this.accessToken = sessionStorage.getItem('accessToken')
    const userInfo = sessionStorage.getItem('userInfo');
    this.userData = (userInfo) ? JSON.parse(userInfo) : '';
  }

  clearStorageData(): void {
    this.accessToken = '';
    this.userData = '';
  }

  doGet(path: any, params: HttpParams = new HttpParams()): any {
    try {
      return this.httpClient.get(environment.api_url + path, {
        params,
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer ' + this.accessToken,
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain',
          'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0'
        }),
        responseType: 'json'
      });
    } catch (error) {
      console.log(error);
    }
  }

  doPost(path: any, payload: object = {}): any {
    try {
      if (this.accessToken) {
        return this.httpClient.post(environment.api_url + path, JSON.stringify(payload), {
          headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + this.accessToken,
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain',
            'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0'
          }),
          responseType: 'json'
        });
      } else {
        try {
          return this.httpClient.post(environment.api_url + path, payload, {
            headers: new HttpHeaders({
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/plain',
              'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0'
            }),
            responseType: 'json'
          });
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  doUploadPost(path: any, formdata: any): any {
    try {
      return this.httpClient.post(environment.api_url + path, formdata, {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer ' + this.accessToken,
          'Accept': 'application/json, text/plain',
          'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0'
        }),
        // responseType: 'arraybuffer'
      });
    } catch (error) {
      console.log(error);
    }
  }

  doPut(path: any, payload: object = {}): any {
    try {
      return this.httpClient.put(environment.api_url + path, JSON.stringify(payload), {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer ' + this.accessToken,
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain',
          'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0'
        }),
        responseType: 'json'
      });
    } catch (error) {
      console.log(error)
    }
  }

  doDelete(path: any): any {
    try {
      return this.httpClient.delete(environment.api_url + path, {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer ' + this.accessToken,
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain',
          'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0'
        })
      });
    } catch (error) {
      console.log(error);
    }
  }

}
