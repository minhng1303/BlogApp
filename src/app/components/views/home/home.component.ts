import { ArticleService } from 'src/app/services/ArticleService/article.service'
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/articles';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/AuthService/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  articles: Article[];
  slugArticle: Article;
  chipList;
  selectedChip: string = '';
  selectedTab: string = 'Global Feed'
  isFavorited: boolean = false;
  headingTab: string[] = ['My Feed', 'Global Feed',]
  constructor(private articleService: ArticleService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.articleService.getArticle().subscribe((res: any) => {
      this.articles = res.articles;
    });
    this.articleService.getTag().subscribe((res: any) => {
      this.chipList = res.tags;
    })
  }

  goToArticle(article) {    
    let slug = article.slug
    this.router.navigate([`article/${slug}`])
  }

  showTagArticle(e) {
    this.articleService.getArticleByTag(e).subscribe(res => {
      this.articles = res['articles']
      this.selectedChip = e;
      this.selectedTab = `#${e}`;      
      if (this.headingTab.length > 2) {
        this.headingTab.pop();
      }
      this.headingTab.push(`#${e}`); 
    })
    
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
            }
          })
        });
        return
    }
    console.log(1);
    this.articleService.removeFavoriteArticle(article.slug).subscribe(res => {
      this.articles.map(ele => {
        if (ele.slug == article.slug) {
          article.favorited = false;
          article.favoritesCount--;
        }
      })
    }); 
  }
  // removeFavorite(article) {
  //   this.articleService.removeFavoriteArticle(article.slug).subscribe(res => {
  //     // console.log(res);
  //     this.isFavorited = false;
  //     this.articleService.getArticle().subscribe((res: any) => {
  //       this.articles = res.articles;
  //     });
  //   })
  // }

  selectTab(tab: string) {
    this.selectedTab = tab;
    console.log(tab);
    
  }
}
