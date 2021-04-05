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
  slugArticle: Article[];
  tagArticle: Article[];
  chipList;
  selectedChip: string = '';
  selectedTab: string = 'Global Feed'
  headingTab: string[] = ['My Feed', 'Global Feed',]
  constructor(private articleService: ArticleService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.articleService.getArticle().subscribe((res: any) => {
      this.slugArticle = res['articles'];
      this.articles = this.slugArticle;
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
      this.tagArticle = res['articles']
      this.articles = this.tagArticle;
      this.selectedChip = e;
      this.selectedTab = `#${e}`;      
      if (this.headingTab.length > 2) {
        this.headingTab.pop();
      }
      this.headingTab.push(`#${e}`); 
    })
  }

  selectTab(tab: string) {
    if (this.selectedTab == tab) return
    this.selectedTab = tab;
    if (tab.includes('#')) {
      this.articles = this.tagArticle;
      return
    } 
    this.articles = this.slugArticle;
  }
}
