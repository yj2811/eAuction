import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListWinnersComponent } from './list-winners.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ListWinnersComponent', () => {
  let component: ListWinnersComponent;
  let fixture: ComponentFixture<ListWinnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        RouterModule,
        RouterTestingModule,
        MaterialModule,
        BrowserAnimationsModule],
      declarations: [ ListWinnersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
