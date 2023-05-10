import { TestBed } from '@angular/core/testing';

import { AdminAuthGuard } from '../admin/admin-auth.guard';
import { HttpClientModule } from '@angular/common/http';

describe('AdminAuthGuard', () => {
  let guard: AdminAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    guard = TestBed.inject(AdminAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
