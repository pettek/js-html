import { RequestData }                   from './request/request-data';
import { UserResultsHandler }            from './results-handler/user-results-handler';
import { CustomFilter, FILTER_SETTINGS } from './filter';

// Specify API url and endpoints
const API = 'https://randomuser.me';
const GET_ENDPOINT = 'api';

export class App {
  /**
   * @constructor
   * @param root
   */
  constructor (root) {
    this.root = root;
    this.requestHandler = new RequestData(API);
    this.filter = new CustomFilter(FILTER_SETTINGS);
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

      // Start from the empty container and show the loader
      this.resultsHandler.clear().loaderOn();

      // makeMultipleCalls returns a single promise composed of array of them
      this.requestHandler.makeMultipleCalls(GET_ENDPOINT,
        this.userNumInput.value).then((users) => {

        // Filter the results accordingly
        users.filter(this.filter.chooseFilter(
          this.root.querySelector('[name="filter"]:checked').value))

              // Show every result that passed through the filter
              .forEach(user => this.resultsHandler.display(user));

      }).catch((error) => {

        // Alert the error, if any caught
        alert(error);

      }).finally(() => {

        // Turn off the loader either way
        this.resultsHandler.loaderOff();

      });
    });

    // Clear the container if button responsible of clearing is pressed
    this.clearBtn.addEventListener('click', () => {
      this.resultsHandler.clear();
    });
  }
}