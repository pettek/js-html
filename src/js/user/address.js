/**
 * This class represents the Address
 */
export class Address {
  constructor () {
    this._city = this._street = this._zipCode = null;
  }

  get city () {
    return this._city;
  }

  set city (value) {
    this._city = value;
  }

  get street () {
    return this._street;
  }

  set street (value) {
    this._street = value;
  }

  get zipCode () {
    return this._zipCode;
  }

  set zipCode (value) {
    this._zipCode = value;
  }

  /**
   * Concatenate the whole address into the string
   * @returns {string}
   */
  toString() {
    return `${this.street} ${this.zipCode} ${this.city}`;
  }
}