import { Article } from './../../../../models/articles';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/ArticleService/article.service';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/UserService/user.service';
import { ModalService } from 'src/app/services/ModalService/modal.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-my-article',
  templateUrl: './my-article.component.html',
  styleUrls: ['./my-article.component.scss'],
})
export class MyArticleComponent implements OnInit {
  mySlugArticle: Article;
  myArticles: Article;
  username = this.auth.currentUser.username;
  userImage = '';

  constructor(
    private articleService: ArticleService,
    private auth: AuthService,
    private router: Router,
    private user: UserService,
    private dialog: ModalService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getImageUrl;
    this.articleService
      .getArticleByAuthor(this.auth.currentUser.username)
      .subscribe((res: any) => {
        this.myArticles = res.articles;
        this.spinner.hide()
      });
  }

  goToMyArticle(myArticle) {
    let mySlugArticle = myArticle.slug;
    this.router.navigate([`article/${mySlugArticle}`]);
  }

  get getImageUrl() {
    this.user.getUser().subscribe((res: any) => {
      this.userImage = res['user'].image;
    });
    return this.userImage;
  }

  showOption() {
    this.dialog
      .openOptionDialog()
      .afterClosed()
      .subscribe((res) => {});
  }
}
