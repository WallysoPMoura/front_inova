import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { catchError, map, Observable, of, throwError } from 'rxjs';

import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  register(payload: { name: string, email: string, password: string, password_confirmation: string }): Observable<any> {
    return this.post('auth/register', payload).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((error: any) => throwError(() => error))
    )
  }

  login(payload: { email: string, password: string }): Observable<any> {
    return this.post('auth/login', payload).pipe(
      map((result: any) => {

        const { token } = result.data

        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(result.data))

        return result;
      }),
      catchError((error: any) => throwError(() => error))
    )
  }

  forgotPassword(payload: { email: string }): Observable<any> {
    return this.post('auth/forgot-password', payload).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((error: any) => throwError(() => error))
    )
  }

  validateCode(payload: { token: number }): Observable<any> {
    return this.post('auth/verify-token', payload).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((error: any) => throwError(() => error))
    )
  }

  changePassword(payload: { password: string, password_confirmation: string, token: number }): Observable<any> {
    return this.post('auth/change-password', payload).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((error: any) => throwError(() => error))
    )
  }

  logout(): Observable<any> {
    localStorage.removeItem('token')
    localStorage.removeItem('user');
    return of([]);
  }

  get isAuthenticated(): boolean {
    return !!localStorage?.getItem('token') && jwtDecode(localStorage.getItem('token')!!)?.exp! > Date.now() / 1000
  }

  get role() {
    const { role } = jwtDecode(localStorage.getItem('token')!!) as any;
    return role;
  }

  get user() {
    if (!this.isAuthenticated || !localStorage.getItem('user')) {
      return '';
    }

    return JSON.parse(localStorage.getItem('user')!!)
  }
  
}
