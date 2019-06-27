export class SignupInfo {

  firstname: string;
  surname: string;
  email: string;
  role: string[];
  password: string;

  constructor(firstname: string, surname: string, email: string, password: string, admin: boolean = false, student: boolean = false, professor: boolean = false) {
    this.firstname = firstname;
    this.surname = surname;
    this.email = email;
    this.role = [];
    if (admin) {
      this.role.push('admin');
    }
    if (student) {
      this.role.push('student');
    }
    if (professor) {
      this.role.push('professor');
    }
    this.password = password;
  }
}
