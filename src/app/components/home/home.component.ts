import { Component } from '@angular/core';
import { AuctionService } from 'src/app/services/auction/auction.service';
import { Auction } from 'src/app/models/auction/auction';
import { Product } from 'src/app/models/product/product';
import { ProductService } from 'src/app/services/product/product.service';
import { Category } from 'src/app/models/category/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';
import Typewriter from 't-writer.js';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/global-constants';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  popularAuctions: Auction[];
  liveAuctions: Auction[];
  upcomingAuctions: Auction[];
  closedAuctions: Auction[];
  products: Product[];
  categories: Category[];
  users: User[];
  apiUrl: string = GlobalConstants.apiURL;
  imgBasePath: string = `${this.apiUrl}image/images/`;

  id: number;
  leftIcon = faChevronLeft;
  rightIcon = faChevronRight;

  imgNames: string[] = [];
  selectedImage: string;

  public carouselBackgroundColor: string = '#f7efff';
  currentIndex=0;

  constructor(private _auctionService: AuctionService, private _productService: ProductService, private _categoryService: CategoryService, private _userService: UserService, private _router: Router
  ) {

  }

  customOptions: OwlOptions = {
    loop: false,
    margin: 50,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    // navText : ["<div><</div>", "<div>></div>"],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    // nav: true
  }

  ngOnInit() {

    const target = document.querySelector('.auto-input');

    const writer = new Typewriter(target, {
      loop: true,
      typeSpeed: 100,
      deleteSpeed: 100,
      typeColor: ''
    })

    writer
      .removeCursor()
      .type('Innovation')
      .rest(1000)
      .changeOps({ deleteSpeed: 100 })
      .clear()
      .type('Opportunity')
      .rest(1000)
      .changeOps({ deleteSpeed: 100 })
      .clear()
      .type('Value')
      .rest(1000)
      .changeOps({ deleteSpeed: 100 })
      .clear()
      .type('Experience')
      .rest(1000)
      .changeOps({ deleteSpeed: 100 })
      .clear()
      .type('Community')
      .rest(1000)
      .changeOps({ deleteSpeed: 100 })
      .clear()
      .type('Convenience')
      .rest(1000)
      .changeOps({ deleteSpeed: 100 })
      .clear()
      .start()


    this._auctionService.popularAuctions().subscribe((data: Auction[]) => {

      this.popularAuctions = data;

    },
      (error) => {
        alert('An error occurred while fetching auctions: ' + error);
      });

    //live auctions
    this._auctionService.listAuctionsWithState('live').subscribe((data: Auction[]) => {

      this.liveAuctions = data;

    },
      (error) => {
        alert('An error occurred while fetching live auctions: ' + error);
    });

    //upcoming auctions
    this._auctionService.listAuctionsWithState('upcoming').subscribe((data: Auction[]) => {

      this.upcomingAuctions = data;

    },
      (error) => {
        alert('An error occurred while fetching upcoming auctions: ' + error);
    });

    //closed auctions
    this._auctionService.listAuctionsWithState('closed').subscribe((data: Auction[]) => {

      this.closedAuctions = data;

    },
      (error) => {
        alert('An error occurred while fetching closed auctions: ' + error);
    });

    this._productService.listProducts().subscribe((data: Product[]) => {
      this.products = data;

    }, (error) => {
      alert('An error occurred' + error.error.message);
    });

    this._categoryService.listCategories().subscribe((data: Category[]) => {
      this.categories = data;

    }, (error) => {
      alert('An error occurred' + error.error.message);
    });

    this._userService.listUsers().subscribe((data: User[]) => {
      this.users = data;

    }, (error) => {
      alert('An error occurred' + error.error.message);
    });
  }

  getProduct(productId: number): Product {
    const product = this.products?.find(p => p.productId === productId);
    return product;
  }

  getImage(productId: number): string {
    const product = this.products?.find(p => p.productId === productId);

    if (product?.productImage) {
      this.imgNames = product.productImage.split(',');
    }
    return this.imgNames[0];
  }

  getCategory(categoryId: number): Category {
    const category = this.categories?.find(c => c.categoryId === categoryId);
    return category;
  }

  getUser(userId: number): User {
    const user = this.users?.find(u => u.userId === userId);
    return user;
  }

  viewAuction(auction: Auction) {
    this.id = auction.auctionId;
    this._router.navigate(['/view-auction/' + this.id]);
  }

  // public onSlide(carousel: NgbCarousel) {
  //   const colors = ['#f7efff', '#eff6ff', '#effff1', '#fdffef']; // or any other set of colors you want
  //   const randomIndex = Math.floor(Math.random() * colors.length); // generate a random index
  //   this.carouselBackgroundColor = colors[randomIndex]; // set the background color to the randomly selected color
  // }

  public onSlide(carousel: NgbCarousel) {
    const colors = ['#f7efff', '#eff6ff', '#effff1', '#fdffef'];
    const nextIndex = (this.currentIndex + 1) % colors.length;
    this.currentIndex = nextIndex;
    this.carouselBackgroundColor = colors[nextIndex];
  }
}

