import { TestBed } from '@angular/core/testing';

import { NotifyService } from './notify.service';
import { HttpClientModule } from '@angular/common/http';

describe('NotifyService', () => {
  let service: NotifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(NotifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
