import { Article } from './../../../../models/articles';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/ArticleService/article.service';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/UserService/user.service';
import { ModalService } from 'src/app/services/ModalService/modal.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-my-article',
  templateUrl: './my-article.component.html',
  styleUrls: ['./my-article.component.scss'],
})
export class MyArticleComponent implements OnInit {
  myArticle: Article[] = [];  
  slugArticle: Article[] = [];
  user: {};
  selectedPage: number = 0;
  totalItems: number = 0;
  itemsPerPage: number = 5;

  constructor(
    private articleService: ArticleService,
    private auth: AuthService,
    private router: Router,
    private userService: UserService,
    private dialog: ModalService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getUser();
    const url = this.router.url.match('(?<=/profile/)(.*)(?=/my-article)')
    this.articleService
      .getArticleByAuthor(url[0])
      .subscribe((res: any) => {
        this.myArticle = res['articles'];
        this.slugArticle = res['articles'];
        this.totalItems = res['articlesCount'];
        this.getPageArticles(0);        
        this.spinner.hide();
      });
  }

  getPageArticles(page) {
    this.myArticle = this.slugArticle.slice(page*5, page*5+5)
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
  
  goToArticle(article) {
    let slug = article.slug;
    this.router.navigate([`article/${slug}`]);
  }

  getUser() {
    this.userService.getUser().subscribe((res: any) => {
      this.user = res['user']      
    });
  }
  
  showOption() {
    this.dialog
      .openOptionDialog()
      .afterClosed()
      .subscribe((res) => {});
  }
}
