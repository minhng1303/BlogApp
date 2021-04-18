import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { currentUser } from 'src/app/models/currentUser';
import { registerUser } from 'src/app/models/registerUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged: boolean = false;
  baseUrl: string = 'https://conduit.productionready.io/api/'
  currentUser: {
    username: any,
    email: string,
    token: string
  }
  constructor(private http: HttpClient, private router: Router) { }

  createUser(username: string,email: string, password: string) {
    return this.http.post(`${this.baseUrl}users`, {
      user: {
        username: username,
        email: email,
        password: password
      }
    })
  }

  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}users/login`, {
      user: {
        email: email,
        password: password
      }
   })
  }

  setLogin() {
    this.isLogged = true;
  }

  setLogout() {
    this.isLogged = false;
  }

  get isAuthenticated(): boolean {
    let user = localStorage.getItem('user');
    if(!this.currentUser) {
      if (user) {      
        this.currentUser = JSON.parse(user);
        return true
      }
      return false;     
    }
    this.currentUser = JSON.parse(user); 
    this.isLogged = true;  
    return true;
  }
}

