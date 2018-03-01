import { RequestData }        from './request-data';
import { UserResultsHandler } from './results-handler';
import { CustomFilter }       from './custom-filter';

const API = 'https://randomuser.me';
const GET_ENDPOINT = '/api';

export class App {
  /**
   * @constructor
   * @param root
   */
  constructor (root) {
    this.root = root;
    this.requestHandler = new RequestData(API);
  }

  assignElements () {
    this.callBtn = this.root.querySelector('.request-btn');
    this.clearBtn = this.root.querySelector('.clear-btn');
    this.userNumInput = this.root.querySelector('[name="users-number"]');
    this.resultsContainer = this.root.querySelector('.api-results');
    this.spinnerContainer = this.root.querySelector('.spinner');
  }

  /**
   * Create all dependencies and events that will enable for this app to run
   * requests to a specific API
   */
  run () {
    this.assignElements();
    this.resultsHandler = new UserResultsHandler(this.resultsContainer,
      this.spinnerContainer);

    this.callBtn.addEventListener('click', () => {
      // Start from the empty container
      this.resultsHandler.clear();
      this.resultsHandler.loaderOn();

      // fetchUsers returns an array of promises
      this.requestHandler.makeMultipleCalls(GET_ENDPOINT,
        this.userNumInput.value).then((users) => {
        // Display every user from the data
        users.filter(CustomFilter.chooseFilter(
          this.root.querySelector('[name="filter"]:checked'))).
              forEach(user => this.resultsHandler.display(user.results));
      }).catch((error) => {
        // Alert the error
        alert(error);
      }).finally(() => {
        // Turn off the loader either way
        this.resultsHandler.loaderOff();
      });
    });

    this.clearBtn.addEventListener('click', () => {
      this.resultsHandler.clear();
    });
  }
}