/**
 * This class represents the User
 */
export class User {
  /**
   * @constructor
   * Initializes an empty User
   */
  constructor () {
    /** @type {Address} */
    this._address = null;

    /** @type {String} */
    this._firstName = null;

    /** @type {String} */
    this._lastName = null;

    /** @type {String} */
    this._userName = null;

    /** @type {String} */
    this._email = null;

    /** @type {String} */
    this._password = null;

    /** @type {String} */
    this._gender = null;

    /** @type {Date} */
    this._registrationDate = null;

    /** @type {String} */
    this._avatar = null;

    /** @type {PhoneNumber[]} */
    this._phoneNumbers = [];
  }

  get address () {
    return this._address;
  }

  set address (value) {
    this._address = value;
  }

  get firstName () {
    return this._firstName;
  }

  set firstName (value) {
    this._firstName = value;
  }

  get lastName () {
    return this._lastName;
  }

  set lastName (value) {
    this._lastName = value;
  }

  get userName () {
    return this._userName;
  }

  set userName (value) {
    this._userName = value;
  }

  get email () {
    return this._email;
  }

  set email (value) {
    this._email = value;
  }

  get password () {
    return this._password;
  }

  set password (value) {
    this._password = value;
  }

  get gender () {
    return this._gender;
  }

  set gender (value) {
    this._gender = value;
  }

  get registrationDate () {
    return this._registrationDate;
  }

  set registrationDate (value) {
    this._registrationDate = value;
  }

  get avatar () {
    return this._avatar;
  }

  set avatar (value) {
    this._avatar = value;
  }

  get phoneNumbers () {
    return this._phoneNumbers;
  }

  set phoneNumbers (value) {
    this._phoneNumbers = value;
  }
}