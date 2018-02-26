export class UserFormValidator {
  constructor (data, rules) {
    this.data = data;
    this.rules = rules;
  }

  validate () {
    const keys = Object.keys(this.rules);

    for (let i = 0; i < keys.length; i++) {
      let data = this.data[keys[i]];
      let requirements = this.rules[keys[i]].split('|');

      for (let j = 0; j < requirements.length; j++) {
        let [type, limit] = requirements[j].split(':');
        switch (type) {
          case 'required':
            if (!data || data.length === 0) {
              alert(keys[i] + ' is required');
              return false;
            }
            break;
          case 'min':
            if (data.length < limit) {
              alert(keys[i] + ' must have at least ' + limit + ' characters');
              return false;
            }
            break;
          case 'max':
            if (data.length > limit) {
              alert(keys[i] + ' must not have more than ' + limit + ' characters');
              return false;
            }
            break;
          case 'number':
            if (!Number.isInteger(+data)) {
              alert(keys[i] + ' should be a number ');
              return false;
            }
            break;
        }
      }
    }
    return true;
  }
}