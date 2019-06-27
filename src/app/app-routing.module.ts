import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';
import {AdminComponent} from './admin/admin.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {CoursesListComponent} from './courses-list/courses-list.component';
import {UsersListComponent} from './users-list/users-list.component';
import {GradesComponent} from './grades/grades.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'admin/courses',
    component: CoursesListComponent
  },
  {
    path: 'admin/users',
    component: UsersListComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'admin/signup',
    component: RegisterComponent
  },
  {
    path: 'grades',
    component: GradesComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
