import { TestBed } from '@angular/core/testing';
import { SellerAuthGuard } from './seller-auth.guard';
import { HttpClientModule } from '@angular/common/http';

describe('SellerAuthGuard', () => {
  let guard: SellerAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule]
    });
    guard = TestBed.inject(SellerAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
