import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/articles';
import { ArticleService } from 'src/app/services/ArticleService/article.service';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  selectedUser: any;
  articles: any;
  slugArticle: Article;
  constructor(
    private userService: UserService,
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((p: any) => {
      this.userService.getProfile(p['username']).subscribe((profile) => {
        this.selectedUser = profile['profile'];
      });
    });
    this.articleService
      .getArticleByAuthor(this.selectedUser.username)
      .subscribe((article) => {
        this.articles = article;
        console.log(this.articles);
      });
  }
}
