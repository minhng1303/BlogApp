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
  usernameError: string = '';
  errorMessage: string = '';
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.settingForm = this.fb.group({
      image: [''],
      username: ['', Validators.required],
      bio: [''],
      email: [{value: '', disabled: true}, [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe((res) => {
      this.userProfile = res['user'];
      this.settingForm.patchValue({
        image: this.userProfile.image,
        username: this.userProfile.username,
        bio: this.userProfile.bio,
        email: this.userProfile.email,
        password: '',
      });
    });
  }

  saveSetting() {
    this.userService
      .updateUser(
        this.settingForm.value.bio,
        this.settingForm.value.image,
        this.settingForm.value.username,
      )
      .subscribe(
        (res: any) => {
          this.auth.currentUser.username = this.settingForm.value.username;
          let hash = {
            username: this.settingForm.value.username, 
            email: this.auth.currentUser.email,
            token: this.auth.currentUser.token
          }
          localStorage.setItem('user', JSON.stringify(hash))
          this.router.navigate(['/profile',hash.username]);          
          
        },
        (err: any) => {          
          this.usernameError = err.error.errors.username[0];          
        }
      );
  }

  get(val) {
    return this.settingForm.controls[val];
  }

  cancel(e) {
    e.stopPropagation();
    this.router.navigate(['/']);
  }
  
  onKeyUp() {
    this.usernameError = '';
  }
}