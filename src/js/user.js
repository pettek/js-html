export class User {
  /**
   *
   */
  constructor () {
    this.firstName = '';
    this.lastName = '';
    this.telephone = '';
    this.address = '';
    this.programmingLanguages = [];
    this.notes = '';
    this.isWorkPermitNeeded = false;
    this.index = 0;
  }

  /**
   *
   * @returns {string}
   */
  get name () {
    return this.firstName + ' ' + this.lastName;
  }

  /**
   *
   * @param fullName
   */
  set name (fullName) {
    const nameArray = fullName.split(' ');
    this.firstName = nameArray[0];
    this.lastName = nameArray[1];
  }
}