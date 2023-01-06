import { TestBed } from '@angular/core/testing';

import { CredentialsGuard } from './credentials.guard';

describe('CredentialsGuard', () => {
  let guard: CredentialsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CredentialsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
