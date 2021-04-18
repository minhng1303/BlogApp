import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-body',
  templateUrl: './article-body.component.html',
  styleUrls: ['./article-body.component.scss']
})
export class ArticleBodyComponent implements OnInit {
@Input('article') article
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToArticle(article) {
    let slug = article.slug;
    this.router.navigate([`article/${slug}`]);
  }

}
