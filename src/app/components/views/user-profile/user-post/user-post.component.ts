import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/ArticleService/article.service';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { ModalService } from 'src/app/services/ModalService/modal.service';
import { UserService } from 'src/app/services/UserService/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Article } from 'src/app/models/articles';
import { UserFavoritedComponent } from '../user-favorited/user-favorited.component';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss']
})
export class UserPostComponent implements OnInit {
  @Input('user') user
  userArticle: Article[] = [];  
  slugArticle: Article[] = [];
  selectedPage: number = 0;
  totalItems: number = 0;
  itemsPerPage: number = 5;
  username: string = '';

  constructor(
    private articleService: ArticleService,
    private auth: AuthService,
    private router: Router,
    private userService: UserService,
    private dialog: ModalService,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    const url = this.router.url.match('(?<=/profile/)(.*)(?=/my-article)')    
    this.articleService.getArticleByAuthor(url[0]).subscribe((res: any) => {
    this.userArticle = res['articles'];
    this.slugArticle = res['articles'];
    this.totalItems = res['articlesCount'];
    this.getPageArticles(0);        
    this.spinner.hide();
    })
  }
  
  getPageArticles(page) {
    this.userArticle = this.slugArticle.slice(page*5, page*5+5)
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

  showOption() {
    this.dialog
      .openOptionDialog()
      .afterClosed()
      .subscribe((res) => {});
  }

}
