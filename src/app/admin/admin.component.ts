import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {TokenStorageService} from '../auth/token-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  board: string;
  errorMessage: string;
  private roles: string[]
  private authority: string;

  constructor(private userService: UserService, private token: TokenStorageService) { }

  ngOnInit() {
    if (this.token.getToken()){
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

    this.userService.getAdminPage().subscribe(
      data => {
        this.board = data;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );

  }

}
