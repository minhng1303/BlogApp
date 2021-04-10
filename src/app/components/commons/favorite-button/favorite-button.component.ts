import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/ArticleService/article.service';
import { AuthService } from 'src/app/services/AuthService/auth.service';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss']
})
export class FavoriteButtonComponent implements OnInit {
  @Input('slugArticle') slugArticle
  isFavorited: boolean;
  constructor(private authService: AuthService, private router: Router, private articleService: ArticleService) { }

  ngOnInit(): void {
    this.isFavorited = this.slugArticle.favorited;
        
  }

  addFavoriteArticle() {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/', 'login']);
      return;
    }
    this.articleService.addFavoriteArticle(this.slugArticle.slug).subscribe((res) => {
      this.slugArticle.favorited= true;
      this.isFavorited = true;
    });
  }

  removeFavorite() {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/', 'login']);
      return;
    }
    this.articleService.removeFavoriteArticle(this.slugArticle.slug).subscribe((res) => {
      this.slugArticle.favorited= false;
      this.isFavorited = false;
    });
  }

}
