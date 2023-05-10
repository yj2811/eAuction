import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginError: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit() : void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login(loginForm: any) {
    if (loginForm.invalid) {
      alert('Please fill in all fields before submitting');
      return;
    }
    this.loginError = "";
    this._userService.userLogin(loginForm.value).subscribe((response) => {
      if (response.success) {
        if(response.data['role'] == "admin"){
          this._router.navigate(['/admin-dashboard/requests']);
        }else if(response.data['role'] == "seller"){
          this._router.navigate(['/seller-dashboard/list-auctions']);
        }else if(response.data['role'] == "buyer"){
          this._router.navigate(['/buyer-dashboard/list-bids']);
        }
      } else {
        this.loginError = "Invalid credentials! Please try again";
        alert('An error occurred while logging in');
      }
    },
      (error) => {
        this.loginError = "Invalid credentials! Please try again";
        alert('An error occurred while logging in: ' + error.error.message);
      });
  }

  openRegister() {
    this._router.navigate(['/register']);
  }
}
