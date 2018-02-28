import { UserRequest }        from './user-request';
import { UserResultsHandler } from './results-handler';

export class App {
  /**
   * @constructor
   * @param root
   */
  constructor (root) {
    this.root = root;
  }

  run () {
    const callButton = this.root.querySelector('.request-btn');
    const clearButton = this.root.querySelector('.clear-btn');
    const howManyUsersInput = this.root.querySelector('[name="users-number"]');
    const requestHandler = new UserRequest(this.root);
    const results = new UserResultsHandler(
      this.root.querySelector('.api-results'),
      this.root.querySelector('.spinner'));

    callButton.addEventListener('click', () => {
      // Start from the empty container
      results.clear();
      results.loaderOn();

      // fetchUsers returns an array of promises
      requestHandler.fetchUsers(howManyUsersInput.value).then((users) => {
        users.forEach(user => results.display(user));
        results.loaderOff();
      }).catch((error) => {
        alert(error);
      });
    });

    clearButton.addEventListener('click', () => {
      results.clear();
    });
  }
}