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
  userArticle: Article[];
  chipList;
  selectedChip: string = '';
  selectedTab: string = 'Global Feed';
  isFavorited: boolean = false;
  headingTab: string[] = ['My Feed', 'Global Feed'];
  totalItems: number = 0;
  itemsPerPage: number = 5;
  tagList=  [];
  recommendedUser = []
  currentUser: any;
  constructor(private articleService: ArticleService, private router: Router, 
              private authService: AuthService, private userService: UserService,
              private spinner: NgxSpinnerService, private dialog: ModalService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.currentUser= {
      image: '',
    }
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
    
    this.userService.getUser().subscribe((res:any) => {
      this.currentUser = res['user']
      this.articleService.getArticleByAuthor(this.currentUser.username)
      .subscribe((res: any) => {
        this.userArticle = res['articles']
        
      });
    })
  }

  getPageTagArticles(page) {
    this.articles = this.tagArticle.slice(page*5, page*5+5)
  }

  getPageArticles(page) {
      if (this.selectedTab == 'My Feed') {
        this.articles = this.userArticle.slice(page*5, page*5+5)
        return
      }
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
    this.spinner.show();
    this.articleService.getArticleByTag(e).subscribe(res => {
      this.tagArticle = res['articles']
      // this.articles = this.tagArticle;
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

  addFavorite(article) {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/', 'login']);
      return;
    }
    if (!article.favorited) {
      this.articleService.addFavoriteArticle(article.slug).subscribe((res) => {
        this.articles.map((ele) => {
          if (ele.slug == article.slug) {
            article.favorited = true;
            article.favoritesCount++;
          }
        });
      });
      return;
    }
    this.articleService.removeFavoriteArticle(article.slug).subscribe((res) => {
      this.articles.map((ele) => {
        if (ele.slug == article.slug) {
          article.favorited = false;
          article.favoritesCount--;
        }
      });
    });
  }

   selectTab(tab: string) {
     console.log(tab);
     
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
