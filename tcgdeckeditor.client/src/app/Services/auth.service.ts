import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginRequest} from '../Requests/LoginRequest';
import {RegisterRequest} from '../Requests/RegisterRequest';
import {ChangePasswordRequest} from '../Requests/ChangePasswordRequest';

//const AUTH_API = 'http://localhost:7033/api/account/';
const AUTH_API = '/api/account/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const request: LoginRequest = {
      email: email,
      password: password
    }

    return this.http.post(
      AUTH_API + 'verify-login',
      request,
      httpOptions
    );
  }

  verifyEmail(email: string): Observable<any> {
    let params = new HttpParams().set("email", email)
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params
    };

    return this.http.get(
      AUTH_API + 'verify-email',
      httpOptions
    )
  }

  register(email: string, password: string, name: string): Observable<any> {
    const request: RegisterRequest = {
      email: email,
      password: password,
      userName: name,
    }

    return this.http.post(
      AUTH_API + 'register-account',
      request,
      httpOptions
    );
  }

  changePassword(email: string, oldPassword: string, newPassword: string): Observable<any> {
    const request: ChangePasswordRequest = {
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword
    }

    return this.http.post(
      AUTH_API + 'change-password',
      request,
      httpOptions
    );
  }
}
