import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizroundComponent } from './quizround.component';

describe('QuizroundComponent', () => {
  let component: QuizroundComponent;
  let fixture: ComponentFixture<QuizroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
