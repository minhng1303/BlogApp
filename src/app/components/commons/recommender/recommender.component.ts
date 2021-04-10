import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-recommender',
  templateUrl: './recommender.component.html',
  styleUrls: ['./recommender.component.scss']
})
export class RecommenderComponent implements OnInit {
  @Input('recommendedUser') recommendedUser;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  followUser(user) {
    this.userService.followUser(user.username).subscribe(res => {
      user.following = true;
    })
  }

  unfollowUser(user) {
    this.userService.unFollowUser(user.username).subscribe(res => {
      user.following = false;
    })
  }

}
