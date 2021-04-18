import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/articles';
import { ArticleService } from 'src/app/services/ArticleService/article.service';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { ModalService } from 'src/app/services/ModalService/modal.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  slug: string = '';
  slugArticle: Article;
  slugComment: Comment[];
  isFavorited: boolean = false;
  newComment: string = '';
  errorMessage: string = '';
  currentUser: {username: any, email: string, token: string}

  constructor(
    private activateRoute: ActivatedRoute,
    private articleService: ArticleService,
    public authService: AuthService,
    private router: Router,
    private dialog: ModalService
  ) {}

  ngOnInit(): void {
    this.slugArticle = {
      slug: ' ',
      title: ' ',
      description: ' ',
      body: ' ',
      tagList: [''],
      createdAt: new Date(),
      updatedAt: new Date(),
      favorited: false,
      favoritesCount: 0,
      author: {
        username: ' ',
        bio: ' ',
        image: ' ',
        following: false,
      },
    };
    this.currentUser = this.authService.currentUser || {username: '', email: '', token: ''}
    this.activateRoute.params.subscribe((data) => {
      this.slug = data.slug;
      this.articleService
        .getSlugArticle(data.slug)
        .subscribe((res: Article) => {
          this.slugArticle = res['article'];
          this.isFavorited = this.slugArticle.favorited;
        });
      this.articleService
        .getCommentArticle(this.slug)
        .subscribe((res: Comment) => {
          this.slugComment = res['comments'];
        });
    });
  }

  get getTitle() {
    return this.slugArticle.title;
  }

  get getAuthor() {
    return this.slugArticle.author.username;
  }

  get getBody() {
    return this.slugArticle.body;
  }

  get getComment() {
    return this.slugComment['comments'];
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }

  isAuthor(comment): boolean {
    return this.currentUser.username === comment.author.username;
  }

  addComment() {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['login']);
      return;
    }
    this.clearErrorMessage();
    if (this.newComment !== '') {
      this.articleService
        .addCommentArticle(this.slug, this.newComment)
        .subscribe((res) => {
          this.articleService
            .getCommentArticle(this.slug)
            .subscribe((res: Comment[]) => {
              this.slugComment = res['comments'];
            });
        });
    } else this.errorMessage = 'Comment cannot be blank';
    this.newComment = '';
  }

  deleteComment(comment) {
    this.dialog.openConfirmDialog().afterClosed().subscribe(res => {
      if (res) {
        this.articleService
      .deleteCommentArticle(this.slug, comment.id)
      .subscribe((res) => {
        this.articleService
          .getCommentArticle(this.slug)
          .subscribe((res: Comment[]) => {
            this.slugComment = res['comments'];
          });
      });
      }
    })    
  }

}
