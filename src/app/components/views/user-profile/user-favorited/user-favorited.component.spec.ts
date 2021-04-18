import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFavoritedComponent } from './user-favorited.component';

describe('UserFavoritedComponent', () => {
  let component: UserFavoritedComponent;
  let fixture: ComponentFixture<UserFavoritedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFavoritedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFavoritedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
