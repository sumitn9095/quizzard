import { TestBed } from '@angular/core/testing';

import { UserscoreService } from './userscore.service';

describe('UserscoreService', () => {
  let service: UserscoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserscoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
