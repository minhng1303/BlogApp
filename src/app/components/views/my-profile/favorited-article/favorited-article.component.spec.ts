import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritedArticleComponent } from './favorited-article.component';

describe('FavoritedArticleComponent', () => {
  let component: FavoritedArticleComponent;
  let fixture: ComponentFixture<FavoritedArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritedArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritedArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
