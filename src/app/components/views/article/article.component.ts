import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/articles';
import { ArticleService } from 'src/app/services/ArticleService/article.service';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  slug: string = '';
  slugArticle: Article;
  slugComment: Comment[];
  // userFavorited: Article[];
  isFavorited: boolean = false;
  isFollowed: boolean = false;
  newComment: string = '';
  errorMessage: string = '';
  currentUser: {
    username: string;
    email: string;
    token: string;
  };

  constructor(
    private activateRoute: ActivatedRoute,
    private articleService: ArticleService,
    public authService: AuthService,
    private router: Router,
    private userService: UserService
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
    this.currentUser = this.authService.currentUser;
    this.activateRoute.params.subscribe((data) => {
      this.slug = data.slug;
      this.articleService
        .getSlugArticle(data.slug)
        .subscribe((res: Article) => {
          this.slugArticle = res['article'];
          this.isFavorited = this.slugArticle.favorited;
          // console.log(res['article'])
        });
      this.articleService
        .getCommentArticle(this.slug)
        .subscribe((res: Comment) => {
          this.slugComment = res['comments'];
          // console.log(res['comments']);
        });
      // this.articleService.getArticleByFav(this.currentUser.username).subscribe((res: any) => {
      //   this.userFavorited = res['articles'];
      // console.log(res['articles']);
      // })
    });
  }

  get getTitle() {
    return this.slugArticle.title;
  }

  get getAuthor() {
    return this.slugArticle.author.username;
  }

  get getImage() {
    return this.slugArticle.author.image;
  }

  get getCreatedTime() {
    return this.slugArticle.createdAt;
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
          // console.log('successfully');
          this.articleService
            .getCommentArticle(this.slug)
            .subscribe((res: Comment[]) => {
              this.slugComment = res['comments'];
              console.log(res);
            });
        });
    } else this.errorMessage = 'Comment cannot be blank';
    this.newComment = '';
  }

  deleteComment(comment) {
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

  deleteArticle(): void {
    // this.authService.navigateIfNotLoged();
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/', 'login']);
      return;
    }
    this.articleService.deleteArticle(this.slug).subscribe((res) => {
      console.log('delete article successfully');
      this.router.navigate(['/']);
    });
  }

  addFavoriteArticle() {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/', 'login']);
      return;
    }
    this.articleService.addFavoriteArticle(this.slug).subscribe((res) => {
      // console.log(res);
      this.isFavorited = true;
    });
  }

  removeFavorite() {
    this.articleService.removeFavoriteArticle(this.slug).subscribe((res) => {
      // console.log(res);
      this.isFavorited = false;
    });
  }

  followAuthor() {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/', 'login']);
      return;
    }
    this.userService.followUser(this.getAuthor).subscribe((res) => {
      this.isFollowed = true;
    });
  }

  unFollowAuthor() {
    this.userService.unFollowUser(this.getAuthor).subscribe((res) => {
      this.isFollowed = false;
    });
  }
}
