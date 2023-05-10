import { Component, ViewChild } from '@angular/core';
import { Category } from 'src/app/models/category/category';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSourcePaginator, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Product } from 'src/app/models/product/product';
import { Auction } from 'src/app/models/auction/auction';
import { GlobalConstants } from 'src/app/global-constants';
import { AuctionService } from 'src/app/services/auction/auction.service';
import { ProductService } from 'src/app/services/product/product.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css', '../../../table-styles.css']
})
export class CategoriesComponent {

  categories: Category[];
  dataSource: any;
  displayedColumns: string[] = ['sNo', 'category', 'auctions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatTableDataSourcePaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  products: Product[];
  auctions: Auction[];
  apiUrl: string = GlobalConstants.apiURL;
  id: number;

  constructor(private _auctionService: AuctionService, private _router: Router, private _productService: ProductService, private _categoryService: CategoryService) {
  }

  ngOnInit() {

    this._categoryService.listApprovedCategories().subscribe((data: Category[]) => {
      this.categories = data;
      this.dataSource = new MatTableDataSource<Category>(this.categories);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    }, (error) => {
      alert('An error occurred' + error.error.message);
    });

    this._productService.listProducts().subscribe((data: Product[]) => {
      this.products = data;

    }, (error) => {
      alert('An error occurred' + error.error.message);
    });

    this._auctionService.listAuctions().subscribe((data: Auction[]) => {

      this.auctions = data;
    },
      (error) => {
        alert('An error occurred while fetching auctions: ' + error);
      });
  }

  filterChange(event : Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
  }

  getProductName(productId: number): string {
    const product = this.products?.find(p => p.productId === productId);
    return product ? product.productName : '';
  }

  getProduct(productId: number): Product {
    const product = this.products?.find(p => p.productId === productId);
    return product;
  }

  viewAuction(auction: Auction) {
    this.id = auction.auctionId;
    this._router.navigate(['/view-auction/' + this.id]);
  }

  listProductsWithCategory(categoryId: number) {
    const productsWithCategory = this.products?.filter(p => p.categoryId === categoryId);
    return productsWithCategory;
  }

  listAuctionsWithProduct(productId: number) {
    const auctions = this.auctions?.filter(a => a.productId === productId);
    return auctions;
}

}
