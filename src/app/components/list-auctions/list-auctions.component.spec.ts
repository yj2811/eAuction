import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListAuctionsComponent } from './list-auctions.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ListAuctionsComponent', () => {
  let component: ListAuctionsComponent;
  let fixture: ComponentFixture<ListAuctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        RouterModule,
        RouterTestingModule,
        MaterialModule,
        BrowserAnimationsModule],
      declarations: [ ListAuctionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAuctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
