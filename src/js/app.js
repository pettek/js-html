import { UserFormHandler } from './forms/user-form-handler';

export class App {
  constructor (root) {
    this.root = root;
  }

  run () {
    const userForm = new UserFormHandler(
      this.root.querySelector('#user-submit-form'));
    userForm.listen(user => console.log(user));

    return this;
  }
}