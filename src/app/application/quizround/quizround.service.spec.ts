import { TestBed, waitForAsync } from '@angular/core/testing';

import { QuizroundService } from './quizround.service';

fdescribe('QuizroundService', () => {
  let service: QuizroundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizroundService);
  });

  fit('should be created', () => {
    expect(service.update_round).toBeNull();
  });

  fit("asdsad", waitForAsync(()=>{
    let userObject = {
      email: localStorage.getItem('email'),
      user_role: localStorage.getItem('userrole')
    };
    // service.update_round().subscribe((d:any) => {
    //   expect(d.length).toBeGreaterThan(0);
    // })
    // spyOn('dwe',service.add_score()).and.returnValues(0);
    // 
    
  }))

});