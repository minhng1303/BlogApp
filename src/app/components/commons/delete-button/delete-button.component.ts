import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/ArticleService/article.service';
import { AuthService } from 'src/app/services/AuthService/auth.service';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent implements OnInit {
  @Input('slugArticle') slugArticle
  constructor(private authService: AuthService,
              private router: Router,
              private articleService: ArticleService) { }

  ngOnInit(): void {
  }

  
  deleteArticle(): void {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/', 'login']);
      return;
    }
    this.articleService.deleteArticle(this.slugArticle.slug).subscribe((res) => {
      this.router.navigate(['/']);
    });
  }

}
