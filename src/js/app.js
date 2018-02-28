import { UserRequest }                           from './user-request';
import { UserResultsHandler }                    from './results-handler';
import { MALE_FILTER, FEMALE_FILTER, NO_FILTER } from './filters';

export class App {
  /**
   * @constructor
   * @param root
   */
  constructor (root) {
    this.root = root;
  }

  assignElements () {
    this.callBtn = this.root.querySelector('.request-btn');
    this.clearBtn = this.root.querySelector('.clear-btn');
    this.userNumInput = this.root.querySelector('[name="users-number"]');
    this.resultsContainer = this.root.querySelector('.api-results');
    this.spinnerContainer = this.root.querySelector('.spinner');
    this.filterInput = this.root.querySelectorAll('[name="filter"]');
  }

  /**
   * Create all dependencies and events that will enable for this app to run
   * requests to a specific API
   */
  run () {
    this.assignElements();
    const requestHandler = new UserRequest(this.root);
    const resultsHandler = new UserResultsHandler(this.resultsContainer,
      this.spinnerContainer);

    this.callBtn.addEventListener('click', () => {
      // Start from the empty container
      resultsHandler.clear();
      resultsHandler.loaderOn();

      // fetchUsers returns an array of promises
      requestHandler.fetchUsers(this.userNumInput.value).then((users) => {
        // Display every user from the data
        users.filter(this.filter).
              forEach(user => resultsHandler.display(user.results));
      }).catch((error) => {
        // Alert the error
        alert(error);
      }).finally(() => {
        // Turn off the loader either way
        resultsHandler.loaderOff();
      });
    });

    this.clearBtn.addEventListener('click', () => {
      resultsHandler.clear();
    });
  }
}