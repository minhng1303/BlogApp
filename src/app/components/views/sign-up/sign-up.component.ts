import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/AuthService/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  usernameError: string = '';
  emailError: string = '';
  signupForm;
  constructor(
    private router:Router, 
    private fb: FormBuilder,
    private auth: AuthService) 
    {
      this.signupForm = fb.group({
        username: ['',[Validators.required, Validators.minLength(6)]],
        email: ['',[Validators.required,Validators.email]],
        password: ['',[Validators.required, Validators.minLength(8)]]
      })
    }

  ngOnInit(): void {
  }

  clearErrorMessage() {
    this.emailError = '';
    this.usernameError = '';
  }

  register(username,email,password) {
    this.clearErrorMessage();
    this.auth.createUser(username,email,password).toPromise().then(data => {
        let currentUser = 
        {
          username: data['user'].username,
          email: data['user'].email,
          token: data['user'].token
        }
      // Set token và user-info xuống local storage
      localStorage.setItem('user', JSON.stringify(currentUser))
      // Check if any token & user-info ở local storage 
          // --> true: login state = true 
          // --> false: login state = false
      if (this.auth.isAuthenticated) 
      {
        this.router.navigate(['settings']);
      }
      // navigate if login successfully   
    }).catch(err => {
      console.log(err); 
      if (err.error.errors.email) {
        this.emailError = 'Email ' + err.error.errors.email[0];
      }
      if (err.error.errors.username) {
        this.usernameError = 'The username ' + err.error.errors.username[0];
      }
    })
  }

  get(val) {
    return this.signupForm.controls[val];
  }

  log() {
    console.log(this.signupForm);
    
  }
}
