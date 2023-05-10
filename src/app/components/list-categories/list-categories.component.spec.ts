import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListCategoriesComponent } from './list-categories.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ListCategoriesComponent', () => {
  let component: ListCategoriesComponent;
  let fixture: ComponentFixture<ListCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        RouterModule,
        RouterTestingModule,
        MaterialModule,
        BrowserAnimationsModule],
      declarations: [ ListCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
