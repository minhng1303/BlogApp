import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttemptScreenComponent } from './attempt-screen.component';

describe('AttemptScreenComponent', () => {
  let component: AttemptScreenComponent;
  let fixture: ComponentFixture<AttemptScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttemptScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttemptScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
