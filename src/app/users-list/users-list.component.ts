import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from './user.model';
import {UsersListService} from './users-list.service';
import {Course} from '../courses-list/course.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  providers: [UsersListService]
})

export class UsersListComponent implements OnInit {
  userList: User[];

  constructor(private userListService: UsersListService) { }

  ngOnInit() {
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
