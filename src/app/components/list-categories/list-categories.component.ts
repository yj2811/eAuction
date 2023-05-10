import { Component, ViewChild } from '@angular/core';
import { Category } from 'src/app/models/category/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css', '../../../table-styles.css']
})
export class ListCategoriesComponent {
  categories: Category[];
  dataSource: MatTableDataSource<Category>;

  admin: boolean = false;
  user: boolean = false;

  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  displayedColumns: string[];

  id: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatTableDataSourcePaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _categoryService: CategoryService, private _router: Router, private _userService: UserService) {
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
      this._categoryService.listCategories().subscribe((data: Category[]) => {

        this.categories = data;
        this.dataSource = new MatTableDataSource<Category>(this.categories);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.displayedColumns = ['sNo', 'categoryId', 'categoryName', 'status', 'handleStatus', 'edit', 'delete'];

      },
        (error) => {
          alert('An error occurred while fetching categories: ' + error);
        });
    } else if (this.user) {
      this._categoryService.listApprovedCategories().subscribe((data: Category[]) => {

        this.categories = data;
        this.dataSource = new MatTableDataSource<Category>(this.categories);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.displayedColumns = ['sNo', 'categoryId', 'categoryName', 'status'];

      },
        (error) => {
          alert('An error occurred while fetching categories: ' + error);
        });
    }
  }

  private clearUserType() {

    this.admin = false;
    this.user = false;

  }

  filterChange(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
  }

  approveCategory(element: Category) {
    if (confirm('Are you sure you want to activate this category?')) {
      this._categoryService.approveCategory(element).subscribe(
        (success: boolean) => {
          if (success) {
            element.status = 'approved';
            this._router.navigate(['/admin-dashboard/list-categories']);
          } else {
            alert('An error occurred');
          }
        },
        (error) => {
          console.error('Error while activating the category:', error);
          alert('An error occurred' + error.error.message);
        }
      );
    }
  }

  denyCategory(element: Category) {
    if (confirm('Are you sure you want to deactivate this category?')) {
      this._categoryService.denyCategory(element).subscribe(
        (success: boolean) => {
          if (success) {
            element.status = 'denied';
            this._router.navigate(['/admin-dashboard/list-categories']);
          } else {
            alert('An error occurred');
          }
        },
        (error) => {
          console.error('Error while deactivating the category:', error);
          alert('An error occurred' + error.error.message);
        }
      );
    }
  }

  editCategory(category: Category): void {

  }

  deleteCategory(category: Category): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this._categoryService.deleteCategory(category).subscribe((success: boolean) => {
        if (success) {
          this.categories = this.categories.filter(u => u !== category);
          this._router.navigate(['/admin-dashboard/list-categories']);
        } else {
          alert('An error occurred');
        }
      },
        (error) => {
          console.error('Error while deleting the category:', error);
          alert('An error occurred' + error.error.message);
        });
    }
  }
}

