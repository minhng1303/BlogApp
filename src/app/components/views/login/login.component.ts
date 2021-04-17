import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { registerUser } from 'src/app/models/registerUser';
import { AuthService } from 'src/app/services/AuthService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm;
  messageError: string = '';
  constructor(
    private router:Router, 
    private fb: FormBuilder,
    private auth: AuthService) 
    {
      this.loginForm = fb.group({
        email: ['',[Validators.required,Validators.email]],
        password: ['',[Validators.required, Validators.minLength(8)]]
      })
    }

  ngOnInit(): void {
  }

  login(email,password) {
    this.auth.login(email,password).toPromise().then(data => {
      let currentUser = {
        username: data['user'].username,
        email: data['user'].email,
        token: data['user'].token
      }
      localStorage.setItem('user', JSON.stringify(currentUser))
      this.auth.isAuthenticated;
      this.router.navigate(['']);
    }).catch(err => { 
      this.messageError = "Email or password " + err.error.errors["email or password"][0];
    })
  }

  get(val) {
    return this.loginForm.controls[val];
  }

  log() {
    console.log(this.loginForm);
    
  }
}
