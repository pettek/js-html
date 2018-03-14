import { UserBuilder } from './user-builder';

/**
 * Supervises the process of building the User
 */
export class CustomAPIUserDirector {
  /**
   * @constructor Represents the director in Builder Pattern
   * @param requestManager
   */
  constructor (requestManager) {
    this.builder = new UserBuilder;
    this.requestManager = requestManager;
  }

  /**
   * Checks that API sent back and make it feasible for getUser method to run
   * Prevents getUser from running into "cannot access property of undefined"
   * error. If there are some data missing, make them empty strings (but this is
   * customizable)
   *
   * @param object
   * @returns {*}
   */
  static validateJSONObject (object) {

    if (!object) {
      object = {};
    }

    if (!object.name || !object.name.first || !object.name.last) {
      object.name = {
        first: object.firstName || '',
        last: object.lastName || '',
      };
    }

    if (!object.gender) {
      object.gender = '';
    }

    if (!object.login || !object.login.username || !object.login.salt ||
      !object.login.sha256) {

      object.login = {
        username: object.username || '',
        salt: object.salt || '',
        sha256: object.password || '',
      };
    }

    if (!object.location || !object.location.city ||
      !object.location.postcode || !object.location.street) {

      object.location = {
        city: object.location.city || '',
        postcode: object.location.zipCode || '',
        street: object.location.street || '',
      };
    }

    if (!object.email) {
      object.email = '';
    }

    if (!object.cell) {
      object.cell = object.telephones[0].number;
    }

    if (!object.phone) {
      object.phone = object.telephones[1].number;
    }

    if (!object.registered) {
      object.registered = '';
    }

    if (!object.picture || !object.picture.large) {

      object.picture = {
        large: '../src/img/user-placeholder.png',
      };
    }

    return object;
  }

  /**
   * Get into data provided by this specific API
   * @param data
   * @returns {*}
   */
  static getDataFromResponse (data) {
    return data[0];
  }

  /**
   * Builds the user using UserBuilder and provided data
   * @returns {Promise<*>}
   */
  getUser (endpoint) {
    return new Promise((resolve, reject) => {
      this.requestManager.get(endpoint).then((userData) => {

        // Get data as a parsed object from the API and validate it
        const object = CustomAPIUserDirector.validateJSONObject(
          CustomAPIUserDirector.getDataFromResponse(userData));

        // Start with the empty User
        const user = this.builder.create();

        // Recipe for building a User
        user.setFirstName(object.name.first).
             setLastName(object.name.last).
             setGender(object.gender).
             setUserName(object.login.username).
             setPassword(object.login.sha256).
             setSalt(object.login.salt).
             setAddress(object.location.city,
               object.location.postcode,
               object.location.street).
             setEmail(object.email).
             setPhoneNumber('cell', object.cell).
             setPhoneNumber('phone', object.phone).
             setAvatar(object.picture.large).
             setRegistrationDate(new Date(object.registered));

        // And resolve the promise with it
        resolve(user.build());

      }).catch((error => {

        reject(error);

      }));
    });
  }
}