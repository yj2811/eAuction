import { Component, ViewChild, ChangeDetectorRef, HostListener } from '@angular/core';
import { Auction, Review } from 'src/app/models/auction/auction';
import { AuctionService } from 'src/app/services/auction/auction.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product/product';
import { Category } from 'src/app/models/category/category';
import { User } from 'src/app/models/user/user';
import { ProductService } from 'src/app/services/product/product.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { UserService } from 'src/app/services/user/user.service';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { BidService } from 'src/app/services/bid/bid.service';
import { Bid } from 'src/app/models/bid/bid';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { faEdit, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { GlobalConstants } from 'src/app/global-constants';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-view-auction',
  templateUrl: './view-auction.component.html',
  styleUrls: ['./view-auction.component.css', '../../../table-styles.css', '../../../form-styles.css']
})
export class ViewAuctionComponent {

  auction: any;
  auctionState: string;

  //for review
  productId: number;

  userId: number;
  auctionId: number;

  id: number;

  products: Product[];
  categories: Category[];
  users: User[];
  reviews: Review[];

  apiUrl: string = GlobalConstants.apiURL;
  imgBasePath: string = `${this.apiUrl}image/images/`;
  imgNames: string[] = [];

  selectedImage: string;

  buyer: boolean = false;

  addBidForm: FormGroup;
  editBidForm: FormGroup;

  addReviewForm: FormGroup;

  myBid: Bid[];
  allBids: Bid[]

  //work on the following for light green highlight
  maxBidIndex: number;

  myBidDataSource: any;
  @ViewChild(MatPaginator, { static: true }) myBidPaginator: MatTableDataSourcePaginator;
  @ViewChild(MatSort, { static: true }) myBidSort: MatSort;

  allBidsDataSource: any;
  @ViewChild(MatPaginator, { static: true }) allBidsPaginator: MatTableDataSourcePaginator;
  @ViewChild(MatSort, { static: true }) allBidsSort: MatSort;


  myBidDisplayedColumns: string[] = ['sNo', 'buyerId', 'bidPricePerUnit', 'bidQty', 'bidAmount', 'bidDate', 'modify'];
  allBidsDisplayedColumns: string[] = ['sNo', 'buyerId', 'bidPricePerUnit', 'bidQty', 'bidAmount', 'bidDate'];

  faEdit = faEdit;
  faCheck = faCheck;
  faTimes = faTimes;
  isEditing: boolean = false;

  activeTab = 'description';

  emdPaid: boolean = false;
  bidMade: boolean = false;

  constructor(private _formBuilder: FormBuilder, private _auctionService: AuctionService, private _router: Router, private _route: ActivatedRoute, private _productService: ProductService, private _categoryService: CategoryService, private _userService: UserService, private _bidService: BidService, private _cdr: ChangeDetectorRef, private _paymentService: PaymentService) {
    _userService.isLoggedIn.subscribe(status => this.clearUserType());
  }

  // for emd payment
  options = {
    "key": "rzp_test_lRkMN23uYCUsPe",
    "amount": "",
    "currency": "INR",
    "name": "Briskon's E-Auction",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": "",
    // "handler": function (response){
    //   const updateSuccess = {
    //     buyerId: JSON.parse(localStorage.getItem('user'))['userId'],
    //     auctionId: this.auction.auctionId,
    //     paymentId: response.razorpay_payment_id,
    //     status: "success"
    //   }

    //   this._paymentService.updatePaymentStatus(updateSuccess).subscribe((data) => {
    //     console.log(data);
    //   });

    //   console.log('success');

    //   // alert(response.razorpay_payment_id);
    //   // alert(response.razorpay_order_id);
    //   // alert(response.razorpay_signature);
    // },
    "handler": (response) => {
      const updateSuccess = {
        buyerId: JSON.parse(localStorage.getItem('user'))['userId'],
        auctionId: this.auction.auctionId,
        paymentId: response.razorpay_payment_id,
        status: "success"
      }

      console.log(updateSuccess);
      this._paymentService.updatePaymentStatus(updateSuccess).subscribe((data) => {
        console.log(data);
      });

      console.log('success');
    },
    "prefill": {
        "name": "",
        "email": "",
        "contact": ""
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
  };

  rzp1;

  payEMD() {
    this.options.amount = (this.auction.emdAmount * 100).toString();
    this.options.prefill.name = (JSON.parse(localStorage.getItem('user'))['firstName']).toString() + (JSON.parse(localStorage.getItem('user'))['lastName']).toString();
    this.options.prefill.email = (JSON.parse(localStorage.getItem('user'))['email']).toString();
    this.options.prefill.contact = (JSON.parse(localStorage.getItem('user'))['mobile']).toString();

    if(this.options.order_id == "") {
      const dataForOrderId = {
        name: this.options.prefill.name,
        email: this.options.prefill.email,
        amount: (this.auction.emdAmount * 100)
      };

      this._paymentService.getOrderId(dataForOrderId).subscribe((data) => {
        this.options.order_id = data.toString();
        //create payment in database then later on success and failure update it.
        const dataForCreatingPayment = {
          buyerId: JSON.parse(localStorage.getItem('user'))['userId'],
          auctionId: this.auction.auctionId,
          orderId: this.options.order_id,
          paymentAmount:  this.auction.emdAmount
        };

        console.log(dataForCreatingPayment);

        this._paymentService.createPayment(dataForCreatingPayment).subscribe((data) => {
          console.log(data);
        });

      }, (error) => {
        alert('An error occurred' + error.error.message);
      });
    }

    this.rzp1 = new this._auctionService.nativeWindow. Razorpay(this.options);

    this.rzp1.on('payment.failed', (response) => {

      const updateFailure = {
        buyerId: JSON.parse(localStorage.getItem('user'))['userId'],
        auctionId: this.auction.auctionId,
        paymentId: response.error.metadata.payment_id,
        status: "failure"
      }

      this._paymentService.updatePaymentStatus(updateFailure).subscribe((data) => {
        console.log(data);
      });

      console.log('failure');
      // alert(response.error.metadata.payment_id);
    });

    this.rzp1.open();
  }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.userId = parseInt(JSON.parse(localStorage.getItem('user'))['userId']);
    }

    this.auctionId = this._route.snapshot.params['id'];

    //finding answers to emdPaid and bidMade

    const dataForIsEMDpaid = {
      auctionId: this.auctionId,
      buyerId: this.userId
    }
    this._paymentService.isEMDpaid(dataForIsEMDpaid).subscribe(
      (response) => {
        if(response == "success"){
          this.emdPaid = true;
        }else{
          this.emdPaid = false;
        }
      },
      (error) => {
        this.emdPaid = false;
      }
    );

    const dataForIsBidMade = {
      auctionId: this.auctionId,
      buyerId: this.userId
    }
    this._bidService.isBidMade(dataForIsBidMade).subscribe(
      (response) => {
        if(response == "success"){
          this.bidMade = true;
        }else{
          this.bidMade = false;
        }
      },
      (error) => {
        this.bidMade = false;
      }
    );

    // get particular auction using id
    this._auctionService.getAuctionById(this.auctionId).subscribe(
      (data) => {
        this.auction = data;
        this.auctionState = this.auction.auctionState;
        this.productId = this.auction.productId;

        // Set the value of the productId form control here
        this.addReviewForm.get('productId').setValue(this.productId);
        this._auctionService.listReviews(this.productId).subscribe((data: Review[]) => {
          this.reviews = data;

        }, (error) => {
          alert('An error occurred' + error.error.message);
        });
      },
      (error) => {
        console.error('Error retrieving auction details:', error.error.message);
      }
    );

    // products
    this._productService.listProducts().subscribe((data: Product[]) => {
      this.products = data;

    }, (error) => {
      alert('An error occurred' + error.error.message);
    });

    // categories
    this._categoryService.listCategories().subscribe((data: Category[]) => {
      this.categories = data;

    }, (error) => {
      alert('An error occurred' + error.error.message);
    });

    // users
    this._userService.listUsers().subscribe((data: User[]) => {
      this.users = data;

    }, (error) => {
      alert('An error occurred' + error.error.message);
    });

    // if buyer
    const role = localStorage.getItem('role');
    if (role == 'buyer') {
      this.buyer = true;

      // show bid form
      this.addBidForm = this._formBuilder.group({
        buyerId: [this.userId, Validators.required],
        auctionId: [this.auctionId, Validators.required],
        bidPricePerUnit: ['', [Validators.required]],
        bidQty: ['', [Validators.required]],
        bidAmount: []
      });

      // show my bid
      this._bidService.listUserBid(this.userId, this.auctionId).subscribe((data) => {

        this.myBid = data;
        this.myBidDataSource = new MatTableDataSource<Bid>(this.myBid);
        this.myBidDataSource.paginator = this.myBidPaginator;
        this.myBidDataSource.sort = this.myBidSort;

      },
        (error) => {
          alert('An error occurred while fetching bids: ' + error.error.message);
        });

      // edit bid
      this.editBidForm = this._formBuilder.group({
        bidId: ['', Validators.required],
        buyerId: [this.userId, Validators.required],
        auctionId: [this.auctionId, Validators.required],
        bidPricePerUnit: ['', [Validators.required]],
        bidQty: ['', [Validators.required]],
        bidAmount: []
      });

      // review
      this.addReviewForm = this._formBuilder.group({
        buyerId: [this.userId, Validators.required],
        productId: ['', Validators.required],
        rating: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
        comment: ['', Validators.required]
      });

    }

    // show all bids
    this._bidService.listAuctionBids(this.auctionId).subscribe((data: Bid[]) => {

      this.allBids = data;
      this.allBidsDataSource = new MatTableDataSource<Bid>(this.allBids);
      this.allBidsDataSource.paginator = this.allBidsPaginator;
      this.allBidsDataSource.sort = this.allBidsSort;
    },
      (error) => {
        alert('An error occurred while fetching bids: ' + error);
      });

    // calculate bid amount
    if (this.addBidForm) {
      this.addBidForm.get('bidPricePerUnit').valueChanges.subscribe(() => {
        this.calculateBidAmount();
      });

      this.addBidForm.get('bidQty').valueChanges.subscribe(() => {
        this.calculateBidAmount();
      });
    }

    // calculate new bid amount
    if (this.editBidForm) {
      this.editBidForm.get('bidPricePerUnit').valueChanges.subscribe(() => {
        this.calculateNewBidAmount();
      });

      this.editBidForm.get('bidQty').valueChanges.subscribe(() => {
        this.calculateNewBidAmount();
      });
    }

  }

  calculateBidAmount() {
    const bidPricePerUnit = this.addBidForm.get('bidPricePerUnit').value;
    const bidQty = this.addBidForm.get('bidQty').value;
    const bidAmount = bidPricePerUnit * bidQty;
    this.addBidForm.patchValue({ bidAmount });
  }

  calculateNewBidAmount() {
    const bidPricePerUnit = this.editBidForm.get('bidPricePerUnit').value;
    const bidQty = this.editBidForm.get('bidQty').value;
    const bidAmount = bidPricePerUnit * bidQty;
    this.editBidForm.patchValue({ bidAmount });
  }

  myBidFilterChange(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.myBidDataSource.filter = filterValue;
  }

  allBidsFilterChange(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.allBidsDataSource.filter = filterValue;
  }

  private clearUserType() {
    this.buyer = false;
  }

  getProduct(productId: number): Product {
    const product = this.products?.find(p => p.productId === productId);

    if (product?.productImage) {
      this.imgNames = product.productImage.split(',');
    }
    if (!this.selectedImage && this.imgNames.length > 0) {
      this.selectedImage = this.imgNames[0];
    }
    return product;
  }

  onImageClick(imgName: string) {
    this.selectedImage = imgName;
    this._cdr.detectChanges();
  }

  getCategory(categoryId: number): Category {
    const category = this.categories?.find(c => c.categoryId === categoryId);
    return category;
  }

  getUser(userId: number): User {
    const user = this.users?.find(u => u.userId === userId);
    return user;
  }

  getWinnerName(winnerId: number): string {
    const winner = this.users?.find(u => u.userId === winnerId);
    return winner ? winner.firstName + ' ' + winner.lastName : '';
  }

  addBid() {
    //payment first

    if (confirm('Before placing a bid, you need to pay an EMD amount. Click OK to go to the payment page.')) {

    }

    if (confirm('Are you sure you want to bid?')) {
      this._bidService.addBid(this.addBidForm.value).subscribe((success: boolean) => {
        if (success) {
          this._router.navigate(['/view-auction/' + this.auction?.auctionId]);

        } else {
          alert('An error occurred while bidding');
        }
      },
        (error) => {
          alert('An error occurred while bidding: ' + error.error.message);
        }
      );
    }
  }

  modifyBid(bid: Bid) {
    this.id = bid.bidId;
    this.isEditing = true;
    this.editBidForm.patchValue({
      bidId: bid.bidId
    });
  }

  editBid(bid: Bid) {

    if (confirm('Are you sure you want to edit this bid?')) {
      this._bidService.editBid(this.editBidForm.value).subscribe((success: boolean) => {
        if (success) {
          bid.bidPricePerUnit = this.editBidForm.get('bidPricePerUnit').value;
          bid.bidQty = this.editBidForm.get('bidQty').value;
          bid.bidAmount = this.editBidForm.get('bidAmount').value;
          this.isEditing = false;
          alert('Bid updated successfully!');
          this._router.navigate(['/view-auction/' + this.auction?.auctionId]);
        } else {
          alert('An error occurred while editing the bid');
        }
      },
        (error) => {
          alert('An error occurred while editing the bid: ' + error.error.message);
        }
      );
    }
  }

  cancelBid(bid: Bid) {
    this.isEditing = false;
  }

  addReview() {
    if (confirm('Are you sure you want to add this review?')) {
      this._auctionService.addReview(this.addReviewForm.value).subscribe((success: boolean) => {
        if (success) {
          alert('Your review was submitted');
        } else {
          alert('An error occurred while submitting the review');
        }
      },
        (error) => {
          alert('An error occurred while submitting the review: ' + error.error.message);
        }
      );

    }
  }

}
