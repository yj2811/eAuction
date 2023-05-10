import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SellerDashboardComponent } from './seller-dashboard.component';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

describe('SellerDashboardComponent', () => {
  let component: SellerDashboardComponent;
  let fixture: ComponentFixture<SellerDashboardComponent>;

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

    fixture = TestBed.createComponent(SellerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
