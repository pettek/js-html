const MALE_FILTER = (user) => user.results[0].gender === 'male';
const FEMALE_FILTER = (user) => user.results[0].gender === 'female';
const NO_FILTER = (user) => true;

export class CustomFilter {
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
