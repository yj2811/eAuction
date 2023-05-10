import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuctionCalendarComponent } from './auction-calendar.component';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AuctionCalendarComponent', () => {
  let component: AuctionCalendarComponent;
  let fixture: ComponentFixture<AuctionCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
      MaterialModule,
      BrowserAnimationsModule],
      declarations: [ AuctionCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
