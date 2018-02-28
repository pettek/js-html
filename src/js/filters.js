const MALE_FILTER = (user) => {return user.results[0].gender === 'male'};
const FEMALE_FILTER = (user) => {return user.results[0].gender === 'female'};
const NO_FILTER = (user) => {return true};

export {MALE_FILTER, FEMALE_FILTER, NO_FILTER};