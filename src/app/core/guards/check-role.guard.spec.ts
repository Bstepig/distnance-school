import { TestBed } from '@angular/core/testing';

import { CheckRoleGuard } from './check-role.guard';

describe('CheckRoleGuard', () => {
  let guard: CheckRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
