import { UserDirector } from './user-director';

/**
 * Supervises the process of building the User
 */
export class CustomAPIUserDirector extends UserDirector {
  /**
   * @constructor Represents the director in Builder Pattern
   * @param requestManager
   */
  constructor (requestManager) {
    super(requestManager);
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
  validateJSONObject (object) {

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
  getDataFromResponse (data) {
    return data[0];
  }

  /**
   *
   * @param endpoint
   * @returns {*}
   */
  getUser(endpoint) {
    return super.getUser(endpoint, this);
  }
}