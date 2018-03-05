import { User, Address, PhoneNumber } from '.';

/**
 * Provides methods to build the User object
 */
export class UserBuilder {
  /**
   * Instantiates the new empty User
   */
  create () {
    this._user = new User();

    return this;
  }

  /**
   * Instantiate the new Address object and pass parameters to it. Assign new
   * Address to User that is being created
   *
   * @param {String} city
   * @param {String} zipCode
   * @param {String} street
   *
   * @returns {UserBuilder}
   */
  setAddress (city, zipCode, street) {
    const address = new Address();

    address.city = city;
    address.street = street;
    address.zipCode = zipCode;

    this._user.address = address;

    return this;
  }

  /**
   * Assign firstName to the user being created
   * @param {String} firstName
   * @returns {UserBuilder}
   */
  setFirstName (firstName) {
    this._user.firstName = firstName;

    return this;
  }

  /**
   * Assign lastName to the user being created
   * @param {String} lastName
   * @returns {UserBuilder}
   */
  setLastName (lastName) {
    this._user.lastName = lastName;

    return this;
  }

  /**
   * Assign gender to the user being created
   * @param {String} gender
   * @returns {UserBuilder}
   */
  setGender (gender) {
    this._user.gender = gender;

    return this;
  }

  /**
   * Assign userName to the user being created
   * @param {String} userName
   * @returns {UserBuilder}
   */
  setUserName (userName) {
    this._user.userName = userName;

    return this;
  }

  /**
   * Assign email to the user being created
   * @param {String} email
   * @returns {UserBuilder}
   */
  setEmail (email) {
    this._user.email = email;

    return this;
  }

  /**
   * Assign password to the user being created
   * @param {String} password
   * @returns {UserBuilder}
   */
  setPassword (password) {
    this._user.password = password;

    return this;
  }

  /**
   * Assign salt to the user being created
   * @param {String} salt
   * @returns {UserBuilder}
   */
  setSalt (salt) {
    this._user.salt = salt;

    return this;
  }

  /**
   * Assign (push to the array) new phoneNumber to the user being created
   * @param {String} type
   * @param {String} number
   *
   * @returns {UserBuilder}
   */
  setPhoneNumber (type, number) {

    const phoneNumber = new PhoneNumber();

    phoneNumber.type = type;
    phoneNumber.number = number;

    this._user.phoneNumbers.push(phoneNumber);

    return this;
  }

  /**
   * Assign avatar to the user being created
   * @param {String} avatar
   * @returns {UserBuilder}
   */
  setAvatar (avatar) {
    this._user.avatar = avatar;

    return this;
  }

  /**
   * Assign registrationDate to the user being created
   * @param {Date} registrationDate
   * @returns {UserBuilder}
   */
  setRegistrationDate (registrationDate) {
    this._user.registrationDate = registrationDate;

    return this;
  }

  /**
   * Returns the User object that has been built
   * @returns {User}
   */
  build () {
    return this._user;
  }

}