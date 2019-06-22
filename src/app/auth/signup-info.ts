export class SignupInfo {

  email: string;
  role: string[];
  password: string;

  constructor(email: string, password: string, admin: boolean = false, student: boolean = false, professor: boolean = false) {
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
