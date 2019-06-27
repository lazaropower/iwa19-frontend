export class Course {
  name: string;
  users: Array<any>;

  constructor(name: string) {
    this.name = name;
    this.users = [];
  }
}
