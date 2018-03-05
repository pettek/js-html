const MALE_FILTER = (user) => user.gender === 'male';
const FEMALE_FILTER = (user) => user.gender === 'female';
const NO_FILTER = (user) => true;

export const FILTER_SETTINGS = {
  male: MALE_FILTER,
  female: FEMALE_FILTER,
  default: NO_FILTER,
};
