import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/articles';
import { ArticleService } from 'src/app/services/ArticleService/article.service';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { MyArticleComponent } from '.././my-profile/my-article/my-article.component';
import { FavoritedArticleComponent } from '.././my-profile/favorited-article/favorited-article.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  currentUser;
  userImage;
  showActiveTab;
  constructor(
    private articleService: ArticleService,
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.currentUser = '';
    this.userService.getUser().subscribe((res) => {
      this.userService
        .getProfile(res['user'].username)
        .subscribe((res: any) => {
          this.currentUser = res.profile;
        });
    });
  }

  goToSetting() {
    this.router.navigate(['setting']);
  }

  showActive() {
    this.showActiveTab = !!this.showActiveTab;
  }
}
