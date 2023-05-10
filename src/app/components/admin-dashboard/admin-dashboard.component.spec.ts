import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule} from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;

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

    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
