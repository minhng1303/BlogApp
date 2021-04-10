import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  showDropdown = false;
  logOut() {
    localStorage.removeItem('user');
    this.auth.setLogout();
    this.router.navigate(['login']);
  }
  constructor(public auth: AuthService, private router: Router) {}
  user = {};
  
  constructor(public auth: AuthService, private router: Router, private userService: UserService,) { }

  ngOnInit(): void {
    this.auth.isAuthenticated;    
    this.userService.getUser().subscribe(res => {
      this.user = res['user']
    })        
  }

  logOut() {
    localStorage.removeItem('user');
    this.auth.setLogout();
    this.router.navigate(['login'])
  }

  ngOnInit(): void {}
}
