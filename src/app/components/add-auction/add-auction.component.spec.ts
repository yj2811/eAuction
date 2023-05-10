import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddAuctionComponent } from './add-auction.component';
import { AuctionService } from 'src/app/services/auction/auction.service';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { of } from 'rxjs';
import { Product } from 'src/app/models/product/product';

describe('AddAuctionComponent', () => {
  let component: AddAuctionComponent;
  let fixture: ComponentFixture<AddAuctionComponent>;
  let auctionService: AuctionService;
  let productService: ProductService;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
      ReactiveFormsModule],
      declarations: [ AddAuctionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    auctionService = TestBed.inject(AuctionService);
    productService = TestBed.inject(ProductService);
    userService = TestBed.inject(UserService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should initialize addAuctionForm successfully', () => {
  //   expect(component.addAuctionForm).toBeDefined();
  //   expect(component.addAuctionForm.get('productId')).toBeDefined();
  //   expect(component.addAuctionForm.get('startDate')).toBeDefined();
  //   expect(component.addAuctionForm.get('endDate')).toBeDefined();
  //   expect(component.addAuctionForm.get('emdAmount')).toBeDefined();
  //   expect(component.addAuctionForm.get('startBidAmount')).toBeDefined();
  //   expect(component.addAuctionForm.get('minIncrementValue')).toBeDefined();
  //   expect(component.addAuctionForm.get('availableQty')).toBeDefined();
  // });

  // it('should initialize form fields with default values or empty', () => {
  //   expect(component.addAuctionForm.get('productId').value).toEqual('');
  //   expect(component.addAuctionForm.get('startDate').value).toEqual('');
  //   expect(component.addAuctionForm.get('endDate').value).toEqual('');
  //   expect(component.addAuctionForm.get('emdAmount').value).toEqual(null);
  //   expect(component.addAuctionForm.get('startBidAmount').value).toEqual(null);
  //   expect(component.addAuctionForm.get('minIncrementValue').value).toEqual(null);
  //   expect(component.addAuctionForm.get('availableQty').value).toEqual(null);
  // });

});

