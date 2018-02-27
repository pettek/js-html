export class FormValidator {
  /**
   * @constructor Encapsulates validation of the form
   * @param data
   * @param rules
   */
  constructor (data, rules) {
    this.data = data;
    this.rules = rules;
  }

  /**
   * Returns true, if every step of validation is successful, or false otherwise
   * @returns {boolean}
   */
  validate (errorHandler) {
    const keys = Object.keys(this.rules);
    let status = true;
    const errorArray = [];

    // Check every piece of data that is mentioned in the rules array
    for (let i = 0; i < keys.length; i++) {
      let data = this.data[keys[i]];
      let requirements = this.rules[keys[i]].split('|');

      // Check every rule (they are separated by the |), for example min:5|max:8
      for (let j = 0; j < requirements.length; j++) {

        /**
         * Some rules have additional info that is indicated by the :, for
         * example min:7 (minimum 7 characters)
         */
        let [type, limit] = requirements[j].split(':');

        // Check the type of the rule and then perform a check
        switch (type) {
          case 'required':
            if (!data || data.length === 0) {
              errorArray.push(keys[i] + ' is required');
              status = false;
            }
            break;
          case 'min':
            if (data.length < limit) {
              errorArray.push(keys[i] + ' must have at least ' + limit +
                ' characters');
              status = false;
            }
            break;
          case 'max':
            if (data.length > limit) {
              errorArray.push(keys[i] + ' must not have more than ' + limit +
                ' characters');
              status = false;
            }
            break;
          case 'number':
            if (!Number.isInteger(+data)) {
              errorArray.push(keys[i] + ' should be a number ');
              status = false;
            }
            break;
        } // switch
      } // for j
    } // for i
    // Perform some action on errorArray (for example alerting)
    errorHandler(errorArray);

    return status;
  }
}