import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {SignupInfo} from '../auth/signup-info';
import {TokenStorageService} from '../auth/token-storage.service';
import {Token} from '@angular/compiler';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignupInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  private authority: string;
  private roles: string[];

  constructor(private authService: AuthService, private token: TokenStorageService) { }

  ngOnInit() {
    if (this.token.getToken()) {
      this.roles = this.token.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_STUDENT') {
          this.authority = 'student';
          return false;
        } else if (role === 'ROLE_PROFESSOR') {
          this.authority = 'professor';
          return false;
        }
        return true;
      });
    }
  }

  onSubmit() {
    console.log(this.form);

    this.signupInfo = new SignupInfo(
      this.form.firstname,
      this.form.surname,
      this.form.email,
      this.form.password,
      this.form.admin,
      this.form.student,
      this.form.professor);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
