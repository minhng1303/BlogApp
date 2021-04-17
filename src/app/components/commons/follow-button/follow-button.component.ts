import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss']
})
export class FollowButtonComponent implements OnInit {
  @Input('slugArticle') slugArticle
  isFollowed: boolean;
  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isFollowed = this.slugArticle.author.following;
  }

  get getAuthor() {
    return this.slugArticle.author.username;
  }
  
  followAuthor() {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/', 'login']);
      return;
    }
    
    this.userService.followUser(this.getAuthor).subscribe((res) => {
      this.isFollowed = true;
      this.slugArticle.author.following = true;
    });
  }

  unFollowAuthor() {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/', 'login']);
      return;
    }
    this.userService.unFollowUser(this.getAuthor).subscribe((res) => {
      this.isFollowed = false;
      this.slugArticle.author.following = false;
    });
  }

}
