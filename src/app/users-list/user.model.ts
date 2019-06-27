export class User {
  id: number;
  firstname: string;
  surname: string;
  email: string;
  password: string;

  constructor(firstname: string, surname: string, email: string, password: string) {
    this.firstname = firstname;
    this.surname = surname;
    this.email = email;
    this.password = password;
  }

}
