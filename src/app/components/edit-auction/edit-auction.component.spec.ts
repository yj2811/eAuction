import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { EditAuctionComponent } from './edit-auction.component';

describe('EditAuctionComponent', () => {
  let component: EditAuctionComponent;
  let fixture: ComponentFixture<EditAuctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        ReactiveFormsModule],
      declarations: [ EditAuctionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
