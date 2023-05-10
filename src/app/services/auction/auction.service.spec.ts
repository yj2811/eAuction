import { TestBed } from '@angular/core/testing';

import { AuctionService } from './auction.service';
import { HttpClientModule } from '@angular/common/http';

describe('AuctionService', () => {
  let service: AuctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(AuctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
