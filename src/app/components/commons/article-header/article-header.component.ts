import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/articles';
import { ModalService } from 'src/app/services/ModalService/modal.service';

@Component({
  selector: 'app-article-header',
  templateUrl: './article-header.component.html',
  styleUrls: ['./article-header.component.scss'],
})
export class ArticleHeaderComponent implements OnInit {
  @Input('article') article: Article;
  @Input('showDot') showDot: boolean;
  @Input('textlight') textlight: boolean;
  constructor(private router: Router, private dialog: ModalService) {}

  ngOnInit(): void {}

  goToProfile(article) {
    let username = article.author.username;

    this.router.navigate([`home/${username}`]);
  }

  showOption() {
    this.dialog
      .openOptionDialog()
      .afterClosed()
      .subscribe((res) => {});
  }
}
