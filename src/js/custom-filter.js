const MALE_FILTER = (user) => user.results[0].gender === 'male';
const FEMALE_FILTER = (user) => user.results[0].gender === 'female';
const NO_FILTER = (user) => true;

export class CustomFilter {

  /**
   * Returns a filter callback based on the value of the checkboxes
   * Filters are specific to the problem (filtering users by gender)
   *
   * @todo Make them a bit more flexible
   * @param filterInput
   * @returns {function(*): boolean}
   */
  static chooseFilter (filterInput) {
    if (!(filterInput.value)) {
      return NO_FILTER;
    } else {
      if (filterInput.value === 'male') {
        return MALE_FILTER;
      } else if (filterInput.value === 'female') {
        return FEMALE_FILTER;
      } else {
        return NO_FILTER;
      }
    }
  }
}
