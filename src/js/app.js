import { Request }                       from './request/request';
import { UserResultsHandler }            from './results-handler/user-results-handler';
import { CustomFilter, FILTER_SETTINGS } from './filter';
import { UserBuilder, APIUserDirector }  from './user';

// Specify API url and endpoints
const API = 'https://randomuser.me';
const ENDPOINT = 'api';

/**
 * Class representing the application
 */
export class App {
  /**
   * @constructor
   * @param root
   */
  constructor (root) {
    this.root = root;
    this.requestHandler = new Request(API);
    this.filter = new CustomFilter(FILTER_SETTINGS);
    this.usersAPIHandler = new APIUserDirector(new UserBuilder(),
      this.requestHandler);
  }

  /**
   * Keeps all the DOM assignments in one place
   */
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
    this.resultsHandler =
      new UserResultsHandler(this.resultsContainer, this.spinnerContainer);

    // Bind click to making multiple requests to API and rendering results
    this.callBtn.addEventListener('click', () => {

      // Create a filter for gender based on radio buttons value
      const genderFilter = this.filter.chooseFilter(
        this.root.querySelector('[name="filter"]:checked').value);

      // Start from the empty container and show the loader
      this.resultsHandler.clear();

      const promiseArr = [];

      // Fill the array with promises that will be resolved into array of users
      for (let i = 0; i < this.userNumInput.value; i++) {
        promiseArr.push(
          this.usersAPIHandler.getUser(ENDPOINT),
        );
      }

      // Resolve the array of promises, reject if any of the promises rejects
      Promise.all(promiseArr).then(users => {
        users.filter(genderFilter).forEach(user => {
          this.resultsHandler.display(user);
        });
      }).catch((error) => console.log(error));
    });

    // Clear the container if button responsible of clearing is pressed
    this.clearBtn.addEventListener('click', () => {
      this.resultsHandler.clear();
    });
  }
}