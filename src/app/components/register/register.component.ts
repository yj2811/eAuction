import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { NotifyService } from 'src/app/services/notify/notify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _router: Router,
    private _notifyService: NotifyService
  ) { }

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(40)]],
      lastName: ['', [Validators.required, Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      role: ['', [Validators.required]],
    });
  }

  register(registerForm: any) {
    if (registerForm.invalid) {
      alert('Please fill in all fields before submitting!');
      return;
    }
    this._userService.userRegistration(registerForm.value).subscribe((success: boolean) => {
      if (success) {
        this._router.navigate(['/login']);

        //notifying users via mail
        const data = {
          name: this.registerForm.value.firstName + ' ' + this.registerForm.value.lastName,
          email: this.registerForm.value.email
        };

        console.log(data);

        this._notifyService.notifyRegisteredUsers(data).subscribe((response) => {
          console.log(response);
        });


        alert('Your account is sent for approval. Please wait.');
      } else {
        alert('An error occurred while registering');
      }
    },
      (error) => {
        alert('An error occurred while registering: ' + error.error.message);
      }
    );
  }

  openLogin() {
    this._router.navigate(['/login']);
  }
}
