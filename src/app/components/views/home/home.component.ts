import { ArticleService } from 'src/app/services/ArticleService/article.service';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/articles';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { UserService } from 'src/app/services/UserService/user.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ModalService } from 'src/app/services/ModalService/modal.service';
import { currentUser } from 'src/app/models/currentUser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  articles: Article[];
  slugArticle: Article[];
  tagArticle: Article[];
  followArticle: Article[];
  chipList = [];
  selectedChip: string = '';
  selectedTab: string = 'Global Feed';
  headingTab: string[] = ['Global Feed'];
  totalItems: number = 0;
  itemsPerPage: number = 5;
  recommendedUser = []
  currentUser: currentUser = {
    id: 0,
    email: '',
    createdAt: '',
    updatedAt: '',
    username: '',
    bio: '',
    image: '',
    token: '',  
  }
  selectedPage: number = 0;
  constructor(private articleService: ArticleService, private router: Router, 
              public authService: AuthService, private userService: UserService,
              private spinner: NgxSpinnerService, private dialog: ModalService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.articleService.getArticle().subscribe((res: any) => {
      this.totalItems = res['articlesCount'];
      this.slugArticle = res['articles'];            
      this.getPageArticles(0);
      this.spinner.hide();
    });

    this.articleService.getTag().subscribe((res: any) => {
          this.chipList = res.tags.filter(e => 
          JSON.stringify(e).replace( /\W/g, '').length
      )})
    
    if (this.authService.isAuthenticated) {
      this.headingTab.unshift('My Feed')
      this.articleService.getFollowedArticle().subscribe(res => {
        this.followArticle = res['articles']
      })
      this.userService.getUser().subscribe(res => {
        this.currentUser = res['user']
      })
    }
  }

  getPageTagArticles(page) {
    this.articles = this.tagArticle.slice(page*5, page*5+5)
  }

  getPageArticles(page) {
      if (this.selectedTab == 'My Feed') {
        this.articles = this.followArticle.slice(page*5, page*5+5)
        return
      }
      this.articles = this.slugArticle.slice(page*5, page*5+5)
    }
    
  handlePageChange(page: number) {    
    if (Math.floor(page/4) !== Math.floor(this.selectedPage/4)) {
      this.spinner.show()
      this.articleService.getArticleOffset(Math.floor(page/4*20)).subscribe(res => {
        this.slugArticle = res['articles']
        this.getPageArticles(page%4)
        this.spinner.hide();
        return
      })
    }
    this.selectedPage = page;
    if (page%4 == 0 && Math.floor(page/4) !== Math.floor(this.selectedPage/4)) {
      this.spinner.show()
      this.articleService.getArticleOffset(page/4*20).subscribe(res => {
        this.slugArticle = res['articles']
        this.getPageArticles(page%4)
        this.spinner.hide();
        return
      })
    }
    this.getPageArticles(page%4); 
  }
  

  goToArticle(article) {
    let slug = article.slug;
    this.router.navigate([`article/${slug}`]);
  }

  showTagArticle(e) {
    this.spinner.show();
    this.articleService.getArticleByTag(e).subscribe(res => {
      this.tagArticle = res['articles']
      this.getPageTagArticles(0)
      this.selectedChip = e;
      this.selectedTab = `#${e}`;
      if (this.headingTab.length > 2) {
        this.headingTab.pop();
      }
      this.headingTab.push(`#${e}`);
      this.spinner.hide();
    });
  }

   selectTab(tab: string) {
    if (this.selectedTab == tab) return
    this.selectedTab = tab;
    if (tab.includes('#')) {
      this.getPageTagArticles(0)
      return
    } 
    if (tab == 'My Feed') {
      this.getPageArticles(0)
    }
    this.getPageArticles(0);
  }

  addPost(title: string, description: string, body: string, tagList: []) {
    this.articleService
      .creatArticle(title, description, body, tagList)
      .toPromise()
      .then((res) => {
        this.router.navigate(['']);
      });
  }
}
