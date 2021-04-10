import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { currentUser } from 'src/app/models/currentUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL: string = 'https://conduit.productionready.io/api/';
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get(this.baseURL + `user`);
  }

  followUser(username) {
    return this.http.post(this.baseURL + `profiles/${username}/follow`, {});
  }

  unFollowUser(username) {
    return this.http.delete(this.baseURL + `profiles/${username}/follow`);
  }

  updateUser(bio, image, username) {
    return this.http.put(this.baseURL + 'user', {
      user: {
        bio: bio,
        image: image,
        username: username,
      },
    });
  }
}
