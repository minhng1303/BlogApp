import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/ArticleService/article.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Article } from 'src/app/models/articles';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss'],
})
export class NewArticleComponent implements OnInit {
  articleForm;
  tagList = [];
  index: number = 0;
  errorMessage: string;
  editMode: boolean = false;
  slugArticle: Article;
  constructor(
    private router: Router,
    private articleService: ArticleService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      body: ['', [Validators.required]],
      tagList: [''],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      if (res.slug) {
        this.editMode = true;        
        this.articleService.getSlugArticle(res.slug).subscribe((res: any) => {
          this.slugArticle = res['article']
          this.articleForm.patchValue({
            title: res['article'].title,
            description: res['article'].description,
            body: res['article'].body,
          })
          this.tagList = res['article'].tagList;
        })
      }  
    })
  }

  creatArticle(e) {
    e.stopPropagation();
    this.articleService
      .creatArticle(
            this.articleForm.value.title, 
            this.articleForm.value.description, 
            this.articleForm.value.body, 
            this.tagList)
      .subscribe((res: any) => {
        this.router.navigate(['/profile']);
      },((res:any) => {
        this.errorMessage = res.errors.error.message;
      })
    )};

  editArticle(e) {
    e.stopPropagation();
    this.articleService.updateArticle(
        this.articleForm.value.title, 
        this.articleForm.value.description, 
        this.articleForm.value.body, 
        this.tagList, 
        this.slugArticle.slug).subscribe(res => {
          this.router.navigate(['article',this.slugArticle.slug])
        })
  }

  get(val) {
    return this.articleForm.controls[val];
  }

  addTag(val,e) {
    e.preventDefault();
    this.tagList.push(val)
    this.get('tagList').reset();
  }

  addTagbyEnter(val,e) {
    e.stopPropagation();
    this.tagList.push(val)
    this.get('tagList').reset();
  }

  deleteTag(tag) {
    this.tagList = this.tagList.filter(ele => {
      return ele != tag;
    })
  }

  getAllTag() {
    this.tagList.forEach(ele => {
      return ele
    })
  }

  log() {
    console.log(this.articleForm);
  }

  cancel(e) {
    e.stopPropagation();
    this.router.navigate(['/']);
  }
}
