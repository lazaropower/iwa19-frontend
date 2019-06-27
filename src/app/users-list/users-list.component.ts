import { Component, OnInit } from '@angular/core';
import {User} from './user.model';
import {UsersListService} from './users-list.service';
import {TokenStorageService} from '../auth/token-storage.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  providers: [UsersListService]
})

export class UsersListComponent implements OnInit {
  userList: User[];
  private roles: string[];
  authority: string;

  constructor(private userListService: UsersListService, private token: TokenStorageService) { }

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

    this.getUsers();
  }

  getUsers(): void {
    this.userListService.getUsers()
      .subscribe(userList => this.userList = userList);
  }

  add(email: string, password: string): void {
    email = email.trim();
    password = password.trim();
    this.userListService.addUser({ email, password } as User)
      .subscribe(user => { this.userList.push(user); },
        error1 => {},
        () => {},
      );
  }

  delete(user: User): void {
    this.userList = this.userList.filter(c => c !== user);
    this.userListService.deleteUser(user).subscribe();
  }


}
