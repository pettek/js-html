export class UserResultsHandler {

  constructor (resultsContainer, spinner) {
    this.resultsContainer = resultsContainer;
    this.spinner = spinner;
  }

  /**
   * Return a string where a first character is capitalized
   * @static
   * @param string
   * @returns {string}
   */
  static capitalize (string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  static genderIcon (string) {
    let icon = '';

    if(string === 'male'){
      icon = '<i class="fa fa-mars"></i>';
    } else if(string === 'female'){
      icon = '<i class="fa fa-venus"></i>';
    } else {
      icon = '<i class="fa fa-genderless"></i>';
    }

    return icon;
  }

  clear () {
    this.resultsContainer.innerHTML = '';
  }

  loaderOn () {
    this.spinner.innerHTML =
      '<i class="fa fa-circle-o-notch fa-spin text-primary" ' +
      'style="font-size: 1.5em; margin-top: 0.25em"></i>';
  }

  loaderOff () {
    this.spinner.innerHTML = '';
  }

  display (data) {
    const {name, email, phone, picture, gender} = data[0];
    const {large} = picture;
    const {title, first, last} = name;

    // Create fullName from title, first and last
    const fullName = UserResultsHandler.capitalize(title) + ' ' +
      UserResultsHandler.capitalize(first) +
      ' ' + UserResultsHandler.capitalize(last);

    const icon = UserResultsHandler.genderIcon(gender);

    const userDiv = document.createElement('div');

    userDiv.innerHTML =
      '<div class="row my-2">' +
      '<div class="col-lg-2 col-md-3">' +
      '<img src="' + large + '" alt="user-photo" class="rounded">' +
      '</div>' +
      '<div class="col-lg-10 col-md-9">' +
      '<h2 class="mt-4">' + icon + ' ' + fullName + '</h2>' +
      '<p>' + email + ' | ' + phone + '</p>' +
      '</div>' +
      '</div>';

    userDiv.classList.add('col-md-12');
    this.resultsContainer.appendChild(userDiv);
  }
}