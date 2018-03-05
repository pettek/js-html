import { UserResultsHandler }            from '../results-handler/user-results-handler';
import { APIUserDirector }               from '../user';
import { Request }                       from '../request/request';
import { CustomFilter, FILTER_SETTINGS } from '../filter';

const API = 'https://randomuser.me';
const ENDPOINT = 'api';

export class UserController {
  /**
   * @constructor Gets all the dependencies and perform some actions on users
   * @param root
   */
  constructor (root) {
    this.root = root;
    this.resultsContainer = this.root.querySelector('.api-results');
    this.spinnerContainer = this.root.querySelector('.spinner');
    this.userNumInput = this.root.querySelector('[name="users-number"]');

    this.requestHandler = new Request(API);
    this.filter = new CustomFilter(FILTER_SETTINGS);
    this.usersAPIHandler = new APIUserDirector(this.requestHandler);

    this.resultsHandler =
      new UserResultsHandler(this.resultsContainer, this.spinnerContainer);
  }

  /**
   * 1) Gets users from API in the loop (value of form input determines how many
   *    users will be fetched
   * 2) Filter the data accordingly (from the filter input in the form)
   * 3) Display the results in the container (div element)
   */
  fetchFromAPI () {
    // Create a filter for gender based on radio buttons value
    const genderFilter = this.filter.chooseFilter(
      /*
       * || {} prevents from error when the user changes value of radio button
       * via Inspector
       */
      (this.root.querySelector('[name="filter"]:checked') || {}).value);

    // Start from the empty container and show the loader
    this.resultsHandler.clear().loaderOn();

    const promiseArr = [];

    // Fill the array with promises that will be resolved into array of users
    for (let i = 0; i < this.userNumInput.value; i++) {
      promiseArr.push(
        this.usersAPIHandler.getUser(ENDPOINT));
    }

    // Resolve the array of promises, reject if any of the promises rejects
    Promise.all(promiseArr).
            then(users => {
              users.filter(genderFilter).forEach(user => {
                this.resultsHandler.display(user);
              });
            }).
            catch((error) => console.error(error)).
            finally(() => this.resultsHandler.loaderOff());
  }

  /**
   * Clears the container (div element)
   */
  clearDisplay () {
    this.resultsHandler.clear();
  }
}