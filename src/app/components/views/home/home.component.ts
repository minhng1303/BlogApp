import { ArticleService } from 'src/app/services/ArticleService/article.service';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/articles';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { UserService } from 'src/app/services/UserService/user.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ModalService } from 'src/app/services/ModalService/modal.service';


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
  totalItems: number = 0;
  itemsPerPage: number = 5;
  tagList=  [];
  recommendedUser = []
  constructor(private articleService: ArticleService, private router: Router, 
              private authService: AuthService, private userService: UserService,
              private spinner: NgxSpinnerService, private dialog: ModalService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.articleService.getArticle().subscribe((res: any) => {
      this.totalItems = res['articles'].length
      this.slugArticle = res['articles'];      
      this.getPageArticles(0);
      this.spinner.hide();
    });

    this.articleService.getTag().subscribe((res: any) => {
      this.chipList = res.tags.filter(e => 
        JSON.stringify(e).replace( /\W/g, '').length
      )
    })

    this.articleService.getArticleLimit(10).subscribe((res:any) => {      
      res['articles'].forEach(ele => {
        this.recommendedUser.push(ele.author)
      })
    })
  }

  getPageArticles(page) {
      this.articles = this.slugArticle.slice(page*5, page*5+5)
    }
    
  handlePageChange(page: number) {
    this.getPageArticles(page);    
  }
  
  showOption() {
    this.dialog.openOptionDialog().afterClosed().subscribe(res => {
      
    })
  }

  goToArticle(article) {
    let slug = article.slug;
    this.router.navigate([`article/${slug}`]);
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
