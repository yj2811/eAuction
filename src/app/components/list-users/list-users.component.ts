import { Component, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css', '../../../table-styles.css']
})
export class ListUsersComponent {
  users: User[];
  dataSource: MatTableDataSource<User>;

  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  displayedColumns: string[] = ['sNo', 'userId', 'userName', 'email', 'mobile', 'role', 'status', 'handleStatus', 'edit', 'delete'];

  id: number;

  @ViewChild(MatPaginator, {static: true}) paginator: MatTableDataSourcePaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private _userService : UserService, private _router : Router)  {

  }

  ngOnInit() {

    this._userService.listUsers().subscribe((data: User[]) => {

      this.users = data;
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
      (error) => {
        alert('An error occurred while fetching users: ' + error);
      });
  }

  filterChange(event : Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
  }

  approveUser(element: User) {
    if (confirm('Are you sure you want to activate this user?')) {
      this._userService.approveUser(element).subscribe(
        (success: boolean) => {
          if (success) {
            element.status = 'approved';
            this._router.navigate(['/admin-dashboard/list-users']);
          } else {
            alert('An error occurred');
          }
        },
        (error) => {
          console.error('Error while activating the user:', error);
          alert('An error occurred' + error.error.message);
        }
      );
    }
  }

  denyUser(element: User) {
    if (confirm('Are you sure you want to deactivate this user?')) {
      this._userService.denyUser(element).subscribe(
        (success: boolean) => {
          if (success) {
            element.status = 'denied';
            this._router.navigate(['/admin-dashboard/list-users']);
          } else {
            alert('An error occurred');
          }
        },
        (error) => {
          console.error('Error while deactivating the user:', error);
          alert('An error occurred' + error.error.message);
        }
      );
    }
  }

  deleteUser(user: User): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this._userService.deleteUser(user).subscribe((success: boolean) => {
        if (success) {
          this.users = this.users.filter(u => u !== user);
          this._router.navigate(['/admin-dashboard/list-users']);
        } else {
          alert('An error occurred');
        }
      },
        (error) => {
          console.error('Error while deleting the user:', error);
          alert('An error occurred' + error.error.message);
        });
    }
  }

  editUser(user : User) {
    this.id = user.userId;
    this._router.navigate(['/admin-dashboard/edit-user/' + this.id]);
  }

}
