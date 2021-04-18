import { Component, Input, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/ArticleService/article.service';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-recommender',
  templateUrl: './recommender.component.html',
  styleUrls: ['./recommender.component.scss']
})
export class RecommenderComponent implements OnInit {
  recommendedUser = [];
  feedUser = [];
  constructor(private userService: UserService, private articleService: ArticleService, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated) {
      this.articleService.getArticleLimit(10).subscribe((res:any) => { 
        res['articles'].forEach(ele => {
            this.recommendedUser.push(ele.author)
        })        
      })
    }
  }

  followUser(user) {
    this.userService.followUser(user.username).subscribe(res => {
      user.following = true;
    })
  }

  unfollowUser(user) {
    this.userService.unFollowUser(user.username).subscribe(res => {
      user.following = false;
    })
  }

}
