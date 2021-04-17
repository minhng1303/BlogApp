import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  currentUser;
  showActiveTab;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.currentUser = '';
    this.userService.getUser().subscribe((res) => {
      this.userService
        .getProfile(res['user'].username)
        .subscribe((res: any) => {
          this.currentUser = res.profile;
        });
    });
  }

  goToSetting() {
    this.router.navigate(['setting']);
  }

  goToNewPost() {
    this.router.navigate(['new-article']);
  }

  showActive() {
    this.showActiveTab = !!this.showActiveTab;
  }
}
