import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { User } from '../_models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = 'https://sgcos.azurewebsites.net/api/user/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http
      .post(`${this.baseURL}login`, model).pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            sessionStorage.setItem('username', this.decodedToken.unique_name);
            sessionStorage.setItem('role', this.decodedToken.role);
          }
        })
      );
  }

  register(model: any) {
    return this.http.post(`${this.baseURL}register`, model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseURL}/${id}`);
  }
}
