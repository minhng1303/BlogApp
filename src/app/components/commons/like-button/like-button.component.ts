import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/ArticleService/article.service';
import { AuthService } from 'src/app/services/AuthService/auth.service';

@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss'],
})
export class LikeButtonComponent implements OnInit {
  @Input('article') article;
  @Input('articles') articles;
  @Output('onLikeChange')
  onLikeChange: EventEmitter<boolean> = new EventEmitter();
  constructor(private articleService: ArticleService, 
              private authService: AuthService, 
              private router: Router) {}

  ngOnInit(): void {
   
  }

   addFavorite(article) {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/','login']);
      return;
    }
    if (!article.favorited) {
      this.articleService.addFavoriteArticle(article.slug).subscribe(res => {
        this.articles.map(ele => {
          if (ele.slug == article.slug) {
            article.favorited = true;
            article.favoritesCount++;
            this.onLikeChange.emit(article);
            }
          })
        });
        return
    }
    this.articleService.removeFavoriteArticle(article.slug).subscribe(res => {
      this.articles.map(ele => {
        if (ele.slug == article.slug) {
          article.favorited = false;
          article.favoritesCount--;
          this.onLikeChange.emit(article);
        }
      })
    }); 
  }
}
