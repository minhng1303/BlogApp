import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  settingForm: FormGroup;
  userProfile;
  usernameError: boolean = false;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.settingForm = this.fb.group({
      image: ['', Validators.required],
      username: ['', Validators.required],
      bio: ['', Validators.required],
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
      password: ['', Validators.required, Validators.minLength[8]],
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    this.userService.getUser().subscribe((res) => {
      this.userProfile = res['user'];
      this.settingForm = this.fb.group({
        image: [
          { value: this.userProfile.image, disabled: false },
          Validators.required,
        ],
        username: [
          { value: this.userProfile.username, disabled: false },
          Validators.required,
        ],
        bio: [
          { value: this.userProfile.bio, disabled: false },
          Validators.required,
        ],
        email: [
          { value: this.userProfile.email, disabled: true },
          [Validators.required, Validators.email],
        ],
        password: [
          { value: '', disabled: true },
          Validators.required,
          Validators.minLength[8],
        ],
      });
      this.spinner.hide();
    });
  }

  saveSetting() {
    if (this.settingForm.value.username === '') return;

    this.userService
      .updateUser(
        this.settingForm.value.bio,
        this.settingForm.value.image,
        this.settingForm.value.username
      )
      .subscribe(
        (res) => {
          this.auth.currentUser.username = this.settingForm.value.username;
          this.router.navigate(['/profile']);
        },
        (err) => {
          this.usernameError = true;
        }
      );
  }

  get(val) {
    return this.settingForm.controls[val];
  }

  cancel() {
    this.router.navigate(['/setting']);
  }

  onKeyUp() {
    this.usernameError = false;
  }
}
