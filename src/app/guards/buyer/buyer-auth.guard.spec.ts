import { TestBed } from '@angular/core/testing';

import { BuyerAuthGuard } from './buyer-auth.guard';
import { HttpClientModule } from '@angular/common/http';

describe('BuyerAuthGuard', () => {
  let guard: BuyerAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    guard = TestBed.inject(BuyerAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
