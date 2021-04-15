import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostIconComponent } from './new-post-icon.component';

describe('NewPostIconComponent', () => {
  let component: NewPostIconComponent;
  let fixture: ComponentFixture<NewPostIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPostIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPostIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
