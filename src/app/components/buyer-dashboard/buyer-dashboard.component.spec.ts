import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuyerDashboardComponent } from './buyer-dashboard.component';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

describe('BuyerDashboardComponent', () => {
  let component: BuyerDashboardComponent;
  let fixture: ComponentFixture<BuyerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterModule,
        RouterTestingModule],
      declarations: [ AdminDashboardComponent,
        SidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
