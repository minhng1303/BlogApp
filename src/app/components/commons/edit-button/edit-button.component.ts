import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.scss']
})
export class EditButtonComponent implements OnInit {
  @Input('slugArticle') slugArticle
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  editArticle() {
    this.router.navigate(['new-article',this.slugArticle.slug]);
  }

}
