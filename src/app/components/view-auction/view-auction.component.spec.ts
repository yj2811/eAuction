import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewAuctionComponent } from './view-auction.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ViewAuctionComponent', () => {
  let component: ViewAuctionComponent;
  let fixture: ComponentFixture<ViewAuctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule,
      RouterModule,
      RouterTestingModule,
      MaterialModule,
      BrowserAnimationsModule ],
      declarations: [ ViewAuctionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
