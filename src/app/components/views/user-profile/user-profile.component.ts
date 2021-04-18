import { Component, Input, OnInit } from '@angular/core';
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
  selectedUser: {image: string,username: string, bio: string};
  articles: any;
  slugArticle: Article;
  constructor(
    private userService: UserService,
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.selectedUser = {image: '',username: '', bio: ''};
    this.route.params.subscribe((p: any) => {
      this.userService.getProfile(p['username']).subscribe((res:any) => {
        this.selectedUser = res['profile'];
        });
      })
    }
}