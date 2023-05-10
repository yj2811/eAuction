import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { ListUsersComponent } from './components/list-users/list-users.component';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { BuyerDashboardComponent } from './components/buyer-dashboard/buyer-dashboard.component';
import { SellerDashboardComponent } from './components/seller-dashboard/seller-dashboard.component';

import { AddCategoryComponent } from './components/add-category/add-category.component';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';

import { AddProductComponent } from './components/add-product/add-product.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

import { NotFoundComponent } from './components/not-found/not-found.component';

import { AdminAuthGuard } from './guards/admin/admin-auth.guard';
import { SellerAuthGuard } from './guards/seller/seller-auth.guard';
import { BuyerAuthGuard } from './guards/buyer/buyer-auth.guard';
import { RequestsComponent } from './components/requests/requests.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddAuctionComponent } from './components/add-auction/add-auction.component';
import { ListAuctionsComponent } from './components/list-auctions/list-auctions.component';
import { EditAuctionComponent } from './components/edit-auction/edit-auction.component';
import { ViewAuctionComponent } from './components/view-auction/view-auction.component';
import { ListWinnersComponent } from './components/list-winners/list-winners.component';
import { ListBidsComponent } from './components/list-bids/list-bids.component';
import { AuctionCalendarComponent } from './components/auction-calendar/auction-calendar.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CompanyComponent } from './components/company/company.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { SampleProductRequestComponent } from './components/sample-product-request/sample-product-request.component';
import { ProductReviewsComponent } from './components/product-reviews/product-reviews.component';

export const routes: Routes = [

  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'user-profile/:id', component: UserProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'contact-us', component: ContactUsComponent },

  {
    path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AdminAuthGuard],
    children: [
      {
        path: 'add-category',
        component: AddCategoryComponent
      },
      {
        path: 'list-categories',
        component: ListCategoriesComponent
      },
      {
        path: 'add-product',
        component: AddProductComponent
      },
      {
        path: 'list-products',
        component: ListProductsComponent
      },
      {
        path: 'edit-product/:id',
        component: EditProductComponent
      },
      {
        path: 'add-user',
        component: AddUserComponent
      },
      {
        path: 'list-users',
        component: ListUsersComponent
      },
      {
        path: 'add-auction',
        component: AddAuctionComponent
      },
      {
        path: 'list-auctions',
        component: ListAuctionsComponent
      },
      {
        path: 'edit-auction/:id',
        component: EditAuctionComponent
      },
      {
        path: 'list-winners',
        component: ListWinnersComponent
      },
      {
        path: 'requests',
        component: RequestsComponent
      },
      {
        path: 'my-profile',
        component: UserProfileComponent
      },
      {
        path: 'sample-product-request',
        component: SampleProductRequestComponent
      },
      {
        path: 'product-reviews',
        component: ProductReviewsComponent
      }
    ]
  },
  { path: 'seller-dashboard', component: SellerDashboardComponent, canActivate: [SellerAuthGuard],
  children: [
    {
      path: 'add-category',
      component: AddCategoryComponent
    },
    {
      path: 'list-categories',
      component: ListCategoriesComponent
    },
    {
      path: 'add-product',
      component: AddProductComponent
    },
    {
      path: 'list-products',
      component: ListProductsComponent
    },
    {
      path: 'edit-product/:id',
      component: EditProductComponent
    },
    {
      path: 'add-auction',
      component: AddAuctionComponent
    },
    {
      path: 'list-auctions',
      component: ListAuctionsComponent
    },
    {
      path: 'edit-auction/:id',
      component: EditAuctionComponent
    },
    {
      path: 'my-profile',
      component: UserProfileComponent
    },
    {
      path: 'sample-product-request',
      component: SampleProductRequestComponent
    },
    {
      path: 'product-reviews',
      component: ProductReviewsComponent
    }
    ]

  },
  { path: 'buyer-dashboard', component: BuyerDashboardComponent, canActivate: [BuyerAuthGuard],
  children: [
    {
      path: 'list-categories',
      component: ListCategoriesComponent
    },
    {
      path: 'list-products',
      component: ListProductsComponent
    },
    {
      path: 'list-bids',
      component: ListBidsComponent
    },
    {
      path: 'list-auctions',
      component: ListAuctionsComponent
    },
    {
      path: 'list-auctions/:state',
      component: ListAuctionsComponent
    },
    {
      path: 'my-profile',
      component: UserProfileComponent
    }
    ]
  },

  { path: 'auction-calendar', component: AuctionCalendarComponent },

  { path: 'view-auction/:id', component: ViewAuctionComponent },

  { path: '**', component: NotFoundComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

  providers: []
})
export class AppRoutingModule { }
