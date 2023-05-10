import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserDetails } from 'src/app/models/user/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  editUserForm: FormGroup;
  userId: number;

  admin: boolean = false;
  seller: boolean = false;
  buyer: boolean = false;

  constructor(private _userService : UserService,private _formBuilder : FormBuilder) {
    _userService.isLoggedIn.subscribe(status => this.clearUserType());
  }

  ngOnInit() {
    const role = localStorage.getItem('role');
    if (role == 'admin') {
      this.admin = true;
    } else if (role == 'seller') {
      this.seller = true;
    } else if (role == 'buyer') {
      this.buyer = true;
    }

    if (localStorage.getItem('user')) {
      this.userId = parseInt(JSON.parse(localStorage.getItem('user'))['userId']);
    }

    // edit user form
    this.editUserForm = this._formBuilder.group({
      userId: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      address: ['', [Validators.required, Validators.maxLength(255)]],
      city: ['', [Validators.required, Validators.maxLength(100)]],
      state: ['', [Validators.required, Validators.maxLength(100)]],
      country: ['', [Validators.required, Validators.maxLength(100)]],
      postalCode: ['', [Validators.required, Validators.maxLength(20)]],
      companyName: ['', [Validators.required, Validators.maxLength(255)]],
      companyAccount: ['', [Validators.required, Validators.maxLength(50)]],
      companyBank: ['', [Validators.required, Validators.maxLength(100)]],
      bankIFSC: ['', [Validators.required, Validators.maxLength(20)]]
    });

    // get particular user using id
    this._userService.getUserDetailsById(this.userId).subscribe(
      (data) => {
        this.editUserForm.patchValue(data);
      },
      (error) => {
        console.error('Error retrieving user details:', error.error.message);
      }
    );

  }

  private clearUserType() {

    this.admin = false;
    this.seller = false;
    this.buyer = false;

  }

  editUser() {
    console.log(this.editUserForm.value);
    if (confirm('Are you sure you want to update the user details?')) {
      this._userService.editUser(this.editUserForm.value).subscribe((success: boolean) => {
        if (success) {
          alert('User details updated successfully');
        } else {
          alert('An error occurred while updating the details');
        }
      },
      (error) => {
        alert('An error occurred while updating the details: ' + error.error.message);
      }
      );

    }
  }

  cancelUpdate() {
    this._userService.getUserDetailsById(this.userId).subscribe(
      (data) => {
        this.editUserForm.patchValue(data);
      },
      (error) => {
        console.error('Error retrieving user details:', error.error.message);
      }
    );
  }


}
