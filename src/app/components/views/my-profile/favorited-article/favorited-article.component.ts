import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Article } from 'src/app/models/articles';
import { currentUser } from 'src/app/models/currentUser';
import { ArticleService } from 'src/app/services/ArticleService/article.service';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-favorited-article',
  templateUrl: './favorited-article.component.html',
  styleUrls: ['./favorited-article.component.scss'],
})
export class FavoritedArticleComponent implements OnInit {
  user: {};
  favoritedArticles: Article[] = [];  
  slugArticle: Article[] = [];
  totalItems: number = 0;
  itemsPerPage: number = 5;
  selectedPage: number = 0;
  
  constructor(
    private articleService: ArticleService,
    private auth: AuthService,
    private userService: UserService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show()
    this.getUser();
    this.articleService
      .getArticleOffsetByFav(0,this.auth.currentUser.username)
      .subscribe((res: any) => {
        this.favoritedArticles = res['articles'];
        this.slugArticle = res['articles'];
        this.totalItems = res['articlesCount'];
        this.getPageArticles(0)        
        this.spinner.hide()
      });    
  }

  handleLikeChange(arc) {
    this.favoritedArticles = this.favoritedArticles.filter(article => {
      return article.slug != arc.slug;
    })
  }

  getPageArticles(page) {
    this.favoritedArticles = this.slugArticle.slice(page*5, page*5+5)
  }
  
  handlePageChange(page: number) {        
    if (Math.floor(page/4) !== Math.floor(this.selectedPage/4)) {
      this.spinner.show()
      this.articleService.getArticleOffsetByFav(Math.floor(page/4*20),this.user['username']).subscribe(res => {
        this.slugArticle = res['articles']
        this.getPageArticles(page%4)
        this.spinner.hide();
        return
      })
    }
    this.selectedPage = page;
    if (page%4 == 0 && Math.floor(page/4) !== Math.floor(this.selectedPage/4)) {
      this.spinner.show()
      this.articleService.getArticleOffsetByFav(Math.floor(page/4*20),this.user['username']).subscribe(res => {
        this.slugArticle = res['articles']
        this.getPageArticles(page%4)
        this.spinner.hide();
        return
      })
    }
    this.getPageArticles(page%4); 
  }

  getUser() {
    this.userService.getUser().subscribe((res: any) => {
      this.user = res['user']      
    });
  }
  
  goToArticle(article) {
    let slug = article.slug;
    this.router.navigate([`article/${slug}`]);
  }
}
