import { UserFormHandler } from './forms/user-form-handler';

export class App {
  /**
   *
   * @param root
   */
  constructor (root) {
    this.root = root;
  }

  /**
   *
   * @returns {App}
   */
  run () {
    const userForm = new UserFormHandler(
      this.root.querySelector('#user-submit-form'));

    const button = this.root.querySelector('#submit-btn');
    button.addEventListener('click', function () {
      userForm.getUserPromise().then(function (user) {
        console.log(user);
      });
    });

    return this;
  }
}