import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { currentUser } from 'src/app/models/currentUser';
import { AuthService } from '../AuthService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // baseURL: string = 'https://conduit.productionready.io/api';
  baseURL: string = 'http://localhost:3001/api';
  constructor(private http: HttpClient, private auth: AuthService) {}

  getProfile(val) {
    return this.http.get(`${this.baseURL}/user/${val}`);
  }

  getUser() {
    return this.http.get(`${this.baseURL}/user`);
  }

  followUser(username) {
    return this.http.post(`${this.baseURL}/profiles/${username}/follow`, {});
  }

  unFollowUser(username) {
    return this.http.delete(`${this.baseURL}/profiles/${username}/follow`);
  }

  updateUser(bio, image, username, user) {
    return this.http.put(`${this.baseURL}/user/${user}`, {
      user: {
        bio: bio,
        image: image,
        username: username,
      },
    });
  }
}
