import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizsetComponent } from './quizset.component';

describe('QuizsetComponent', () => {
  let component: QuizsetComponent;
  let fixture: ComponentFixture<QuizsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizsetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
