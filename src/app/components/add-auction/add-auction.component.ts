import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuctionService } from 'src/app/services/auction/auction.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product/product';

@Component({
  selector: 'app-add-auction',
  templateUrl: './add-auction.component.html',
  styleUrls: ['./add-auction.component.css', '../../../form-styles.css']
})
export class AddAuctionComponent {

  addAuctionForm: FormGroup;

  products: Product[];

  admin: boolean = false;
  user: boolean = false;

  constructor(private _formBuilder: FormBuilder, private _auctionService: AuctionService, private _router: Router, private _productService: ProductService, private _userService: UserService, private _http: HttpClient) {
    _userService.isLoggedIn.subscribe(status => this.clearUserType());
  }

  ngOnInit() {

    const role = localStorage.getItem('role');
    if (role == 'admin') {
      this.admin = true;
    } else {
      this.user = true;
    }

    if (this.admin) {
      this.addAuctionForm = this._formBuilder.group({
        productId: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        emdAmount: [null, [Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
        startBidAmount: [null, [Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
        minIncrementValue: [null, [Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
        // currentBidAmount: [null, [Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
        availableQty: [null, [Validators.min(0)]]
      });

      this._productService.listProducts().subscribe(
        (data: Product[]) => {
          this.products = data;
        },
        (error) => {
          alert('An error occurred while fetching products: ' + error);
        }
      );

    } else if (this.user) {
      this.addAuctionForm = this._formBuilder.group({
        productId: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        emdAmount: [null, [Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
        startBidAmount: [null, [Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
        minIncrementValue: [null, [Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
        // currentBidAmount: [null, [Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
        availableQty: [null, [Validators.min(0)]]
      });

      const userId = parseInt(JSON.parse(localStorage.getItem('user'))?.userId || '');
      console.log(userId);

      this._productService.listUserProducts(userId).subscribe(
        (data: Product[]) => {
          this.products = data;
        },
        (error) => {
          alert('An error occurred while fetching products: ' + error);
        }
      );
    }
  }

  clearUserType() {

    this.admin = false;
    this.user = false;

  }

  addAuction() {
    if (confirm('Are you sure you want to add this auction?')) {
      this._auctionService.addAuction(this.addAuctionForm.value).subscribe((success: boolean) => {
        if (success) {
          alert('Your auction is sent for approval. Once approved it will be displayed in `My Auctions`.');
          if (this.admin) {
            this._router.navigate(['/admin-dashboard/list-auctions']);
          } else if (this.user) {
            this._router.navigate(['/seller-dashboard/list-auctions']);
          }
        } else {
          alert('An error occurred while adding the auction');
        }
      },
        (error) => {
          alert('An error occurred while adding the auction: ' + error.error.message);
        }
      );

    }
  }

}
