import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  adminSidebar: boolean = false;
  sellerSidebar: boolean = false;
  buyerSidebar: boolean = false;

  constructor(private _userService : UserService) {
    _userService.isLoggedIn.subscribe(status => this.clearSidebar())
  }

  ngOnInit() {
      const role = localStorage.getItem('role');
      if(role=='admin'){
        this.adminSidebar = true;
      }else if(role=='seller'){
        this.sellerSidebar = true;
      }else if(role=='buyer'){
        this.buyerSidebar = true;
      }
  }

  private clearSidebar() {

      this.adminSidebar = false;
      this.sellerSidebar = false;
      this.buyerSidebar = false;

  }
}
