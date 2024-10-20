import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  get(endpoint: string, params: any = "", headers: { [key: string]: any } = {}): Observable<any> {
    return this.http.get((endpoint.includes('http://') || endpoint.includes('https://')) ? endpoint : this.API_URL + endpoint, { headers: this.headers(headers), params: params }).pipe(
      map((result: any) => result),
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }

  post(endpoint: string, params: any, headers: { [key: string]: any } = {}): Observable<any> {
    return this.http.post((endpoint.includes('http://') || endpoint.includes('https://')) ? endpoint : this.API_URL + endpoint, params, { headers: this.headers(headers) }).pipe(
      map((result: any) => result),
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }

  put(endpoint: string, params: any, headers: { [key: string]: any } = {}): Observable<any> {
    return this.http.put(this.API_URL + endpoint, params, { headers: this.headers(headers) }).pipe(
      map((result: any) => result),
      catchError((error: any) => throwError(() => new Error(error)))
    );
  }

  delete(endpoint: String, params: any, headers: { [key: string]: any } = {}): Observable<any> {
    return this.http.delete(this.API_URL + endpoint, { headers: this.headers(headers), params: params }).pipe(
      map((result: any) => result),
      catchError((error: any) => throwError(() => error))
    );
  }

  request(method: string, endpoint: string, params: any, headers: { [key: string]: any } = {}): Observable<any> {
    return this.http.request(method, this.API_URL + endpoint, {
      params: params,
      headers: this.headers(headers)
    })
  }

  getFile(endpoint: string): Observable<string> {
    // Substitua 'your-backend-url' pelo URL real do seu serviço de backend
    return this.http.get<string>(endpoint);
  }

  headers(custom: { [key: string]: [value: any] }): HttpHeaders {
    let headers = new HttpHeaders()

    if (localStorage.getItem('token')) {
      headers = headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
    }

    Object.entries(custom).forEach(([key, value]) => {
      headers = headers.append(key, value);
    })

    return headers;
  }

  private serializeParams(params: any): any {
    if (params && params.filters) {
      // Converte o campo 'filters' para string JSON
      return { ...params, filters: JSON.stringify(params.filters) };
    }
    return params;
  }

}
