import { Component, OnInit } from '@angular/core';
import {Course} from './course.model';
import {TokenStorageService} from '../auth/token-storage.service';
import {COURSES} from './mock-course-list';
import {User} from '../users-list/user.model';
import {UsersListService} from '../users-list/users-list.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})

export class CoursesListComponent implements OnInit {
  courseList: Course[];
  userList: User[];
  /* Hashmap donde la clave sea la asignatura y el valor sea el nombre del usuario con la nota. */
  errorMessage = '';
  isAdded = false;
  private roles: string[];
  private authority: string;

  constructor(private token: TokenStorageService, private userListService: UsersListService) {

  }

  ngOnInit() {
    if (this.token.getToken()) {
      this.roles = this.token.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.getCourses();
          this.getUsers();
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

  onSubmit(){

  }

  getUsers(): void {
    this.userListService.getUsers()
      .subscribe(userList => this.userList = userList);
  }

  getCourses(): void {
    this.courseList = COURSES;
  }

  add(name: string): void {
    if (this.courseList.filter(c => c.name === name).length > 0) {
      this.isAdded = true;
      this.errorMessage = 'Fail -> The course already exist';
    } else {
      this.courseList.push(new Course(name));
    }
  }

  addUserToCourse(user: string, course: string): void {
    const aux = { email: user, grade: null };
    this.courseList.find(c => c.name === course).users.push(aux);
  }

  deleteUserFromCourse(user: string, course: string): void {
    const aux = this.courseList.find( c => c.name === course);
    aux.users = aux.users.filter(u => u.email !== user);
  }

  delete(course: Course): void {
    this.courseList = this.courseList.filter(c => c.name !== course.name);
  }
}
