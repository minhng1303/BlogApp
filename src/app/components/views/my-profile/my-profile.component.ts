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
  userInfo;
  showActiveTab;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.currentUser = '';
    this.userInfo = {};
    this.userService.getUser().subscribe((res) => {
      this.userInfo = res['user'];
      console.log(this.userInfo);

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

  showActive() {
    this.showActiveTab = !!this.showActiveTab;
  }
}
