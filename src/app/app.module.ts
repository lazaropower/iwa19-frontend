import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { UsersListComponent } from './users-list/users-list.component';
import { GradesComponent } from './grades/grades.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/courses', component: CoursesListComponent },
  { path: 'admin/users', component: UsersListComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'admin/signup', component: RegisterComponent },
  { path: 'grades', component: GradesComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    AdminComponent,
    CoursesListComponent,
    UsersListComponent,
    GradesComponent,
  ],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
