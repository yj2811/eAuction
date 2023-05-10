import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component'
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { AddProductComponent } from './components/add-product/add-product.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

import { HomeComponent } from './components/home/home.component';

import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SellerDashboardComponent } from './components/seller-dashboard/seller-dashboard.component';
import { BuyerDashboardComponent } from './components/buyer-dashboard/buyer-dashboard.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module'

import { FlexLayoutModule } from '@angular/flex-layout';
import { RequestsComponent } from './components/requests/requests.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddAuctionComponent } from './components/add-auction/add-auction.component';
import { ListAuctionsComponent } from './components/list-auctions/list-auctions.component';
import { EditAuctionComponent } from './components/edit-auction/edit-auction.component';
import { ViewAuctionComponent } from './components/view-auction/view-auction.component';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { ListWinnersComponent } from './components/list-winners/list-winners.component';
import { ListBidsComponent } from './components/list-bids/list-bids.component';
import { AuctionCalendarComponent } from './components/auction-calendar/auction-calendar.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CompanyComponent } from './components/company/company.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { SampleProductRequestComponent } from './components/sample-product-request/sample-product-request.component';
import { ProductReviewsComponent } from './components/product-reviews/product-reviews.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    ListProductsComponent,
    EditProductComponent,
    HomeComponent,
    UserProfileComponent,
    AdminDashboardComponent,
    SellerDashboardComponent,
    BuyerDashboardComponent,
    LoginComponent,
    ForgotPasswordComponent,
    NotFoundComponent,
    RegisterComponent,
    ListUsersComponent,
    RequestsComponent,
    AddCategoryComponent,
    ListCategoriesComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AddUserComponent,
    AddAuctionComponent,
    ListAuctionsComponent,
    EditAuctionComponent,
    ViewAuctionComponent,
    ListWinnersComponent,
    ListBidsComponent,
    AuctionCalendarComponent,
    CategoriesComponent,
    CompanyComponent,
    ResourcesComponent,
    ContactUsComponent,
    SampleProductRequestComponent,
    ProductReviewsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
    BrowserAnimationsModule,
    RouterModule,
    MaterialModule,

    FlexLayoutModule,
    CarouselModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

