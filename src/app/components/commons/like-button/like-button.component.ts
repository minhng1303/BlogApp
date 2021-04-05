import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/ArticleService/article.service';

@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss'],
})
export class LikeButtonComponent implements OnInit {
  likeCount: number;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {}
}
