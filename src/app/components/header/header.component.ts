import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { User } from 'src/app/models/user/user';
import { faEnvelope, faPhone, faSearch, faTimes, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  loggedOut: boolean;
  loggedIn: boolean;

  user: any;
  userName: string;
  role: string;

  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faHeart = faHeart;
  faUser = faUser;

  faSearch = faSearch;
  faTimes = faTimes;

  constructor(private _userService : UserService, private _router : Router) {
    _userService.isLoggedIn.subscribe(status => this.toggleLoginLogout(status))
  }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null) {
      this.toggleLoginLogout(true);
    }else {
      this.toggleLoginLogout(false);
    }
  }

  toggleSearch(): void {
    const searchBar = document.querySelector('.search-bar') as HTMLElement;
    const searchIcon = document.querySelector('.faSearch') as HTMLElement;
    const crossIcon = document.querySelector('.faTimes') as HTMLElement;
    const menuItems = document.querySelector('.menu-items') as HTMLElement;

    searchBar.style.display = 'block';
    crossIcon.style.display = 'block';
    searchIcon.style.display = 'none';
    menuItems.style.display = 'none';
  }

  toggleMenu(): void {
    const searchBar = document.querySelector('.search-bar') as HTMLElement;
    const crossIcon = document.querySelector('.faTimes') as HTMLElement;
    const searchIcon = document.querySelector('.faSearch') as HTMLElement;
    const menuItems = document.querySelector('.menu-items') as HTMLElement;

    searchBar.style.display = 'none';
    crossIcon.style.display = 'none';
    searchIcon.style.display = 'block';
    menuItems.style.display = 'block';
  }

  private toggleLoginLogout(status: boolean) : void {
    this.loggedOut = !status;
    this.loggedIn = status;

    if(this.loggedIn == true){
      this.user = JSON.parse(localStorage.getItem('user'));
      this.userName = this.user['firstName'];
      this.role = this.user['role'];
    }
  }

  logout() {
    this.userName = "";
    this.role = "";
    this._userService.logoutUser();
    this._router.navigate(['/']);
    this.toggleLoginLogout(false);

  }

}
