export class User {
  /**
   * @constructor Represents a User
   */
  constructor () {
    this.firstName = '';
    this.lastName = '';
    this.telephone = '';
    this.address = '';
    this.programmingLanguages = [];
    this.notes = '';
    this.isWorkPermitNeeded = false;
  }

  /**
   * Create a correct full name using object properties
   * @returns {string}
   */
  get name () {
    return this.firstName + ' ' + this.lastName;
  }

  /**
   * Split the fullName on the white space and assign properties
   * @param fullName
   */
  set name (fullName) {
    const nameArray = fullName.split(' ');
    this.firstName = nameArray[0];
    this.lastName = nameArray[1];
  }
}