import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/articles';
import { ModalService } from 'src/app/services/ModalService/modal.service';

@Component({
  selector: 'app-article-header',
  templateUrl: './article-header.component.html',
  styleUrls: ['./article-header.component.scss']
})
export class ArticleHeaderComponent implements OnInit {
  @Input('article') article: Article;
  @Input('showDot') showDot: boolean;
  @Input('textlight') textlight: boolean;
  constructor(private router: Router, private dialog: ModalService) { }

  ngOnInit(): void {    
  }

  goToArticle(article) {
    let slug = article.slug;
    this.router.navigate([`article/${slug}`]);
  }

  goToProfile(article) {
    let author = article.author.username;
    this.router.navigate(['profile',author])
  }

  showOption() {
    this.dialog.openOptionDialog().afterClosed().subscribe(res => {
      
    })
  }
}
