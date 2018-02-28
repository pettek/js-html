const SPINNER = '<i class="fa fa-circle-o-notch fa-spin text-primary" ' +
  'style="font-size: 1.5em; margin-top: 0.25em"></i>';
const MALE_ICON = '<i class="fa fa-mars"></i>';
const FEMALE_ICON = '<i class="fa fa-venus"></i>';
const OTHER_ICON = '<i class="fa fa-genderless"></i>';

export class UserResultsHandler {

  /**
   * @constructor Represents a Handler that renders the HTML to show what API returned
   * @param resultsContainer
   * @param spinner
   */
  constructor (resultsContainer, spinner) {
    this.resultsContainer = resultsContainer;
    this.spinner = spinner;
  }

  /**
   * Return a font-awesome icon to represent gender graphically
   * @param string
   * @returns {string}
   */
  static genderIcon (string) {
    let icon = '';

    if(string === 'male'){
      icon = MALE_ICON;
    } else if(string === 'female'){
      icon = FEMALE_ICON;
    } else {
      icon = OTHER_ICON;
    }

    return icon;
  }

  clear () {
    this.resultsContainer.innerHTML = '';
  }

  loaderOn () {
    this.spinner.innerHTML = SPINNER;

  }

  loaderOff () {
    this.spinner.innerHTML = '';
  }

  display (data) {
    const {
      name: {title, first, last}, email, phone, picture: {large}, gender}
      = data[0]; // data is array with one element

    // Create fullName from title, first and last
    const fullName = `${title} ${first} ${last}`;
    const icon = UserResultsHandler.genderIcon(gender);

    const userDiv = document.createElement('div');

    userDiv.innerHTML =
      '<div class="row my-2">' +
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