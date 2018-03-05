import { ResultsHandler } from './results-handler';

const MALE_ICON = '<i class="fa fa-mars"></i>';
const FEMALE_ICON = '<i class="fa fa-venus"></i>';
const OTHER_ICON = '<i class="fa fa-genderless"></i>';

/**
 * User-specific DOM modification class
 */
export class UserResultsHandler extends ResultsHandler {
  /**
   * Return a font-awesome icon to represent gender graphically
   * @param string
   * @returns {string}
   */
  static genderIcon (string) {
    let icon = '';

    if (string === 'male') {
      icon = MALE_ICON;
    } else if (string === 'female') {
      icon = FEMALE_ICON;
    } else {
      icon = OTHER_ICON;
    }

    return icon;
  }

  /**
   * Parse User data to render HTML element to plug into the container
   * @param data
   */
  display (data) {
    const {
      firstName: first,
      lastName: last,
      email,
      avatar: large,
      gender,
    } = data;

    // Can't access phone via destructuring
    const phone = data.phoneNumbers[1].number;

    // Create fullName from title, first and last
    const fullName = `${first} ${last}`;
    const icon = UserResultsHandler.genderIcon(gender);

    const userDiv = document.createElement('div');

    userDiv.innerHTML =
      '<div class="row my-2 user-row">' +
        '<div class="col-lg-2 col-md-3">' +
          '<img src="' + large + '" alt="user-photo" class="rounded">' +
        '</div>' +
        '<div class="col-lg-10 col-md-9">' +
          '<h2 class="mt-4 text-capitalize">' + icon + ' ' + fullName + '</h2>'+
          '<p class="text-muted">' + email + ' | ' + phone + '</p>' +
        '</div>' +
      '</div>';

    userDiv.classList.add('col-md-12');

    // Append created div into the container
    this.resultsContainer.appendChild(userDiv);
  }
}