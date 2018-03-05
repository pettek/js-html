/**
 * This class represents the PhoneNumber
 */

/* eslint-disable */

export class PhoneNumber {
  constructor () {
    /** @type {String} */
    this._type = null;

    /** @type {String} */
    this._number = null;
  }

  get type () {
    return this._type;
  }

  set type (value) {
    this._type = value;
  }

  get number () {
    return this._number;
  }

  set number (value) {
    this._number = value;
  }
}