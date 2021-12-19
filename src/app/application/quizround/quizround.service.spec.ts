import { TestBed } from '@angular/core/testing';

import { QuizroundService } from './quizround.service';

describe('QuizroundService', () => {
  let service: QuizroundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizroundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
