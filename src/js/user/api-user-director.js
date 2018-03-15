import { UserDirector }          from './user-director';

/**
 * Supervises the process of building the User
 */
export class APIUserDirector extends UserDirector {
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
      console.error('JSON returned from API invalid');
    }

    if (!object.name || !object.name.first || !object.name.last) {
      object.name = {
        first: object.name.first || '',
        last: object.name.last || '',
      };

      console.error('Invalid name data from API');
    }

    if (!object.gender) {
      object.gender = '';

      console.error('Invalid gender data from API');
    }

    if (!object.login || !object.login.username || !object.login.salt ||
      !object.login.sha256) {

      object.login = {
        username: object.login.username || '',
        salt: object.login.salt || '',
        sha256: object.login.sha256 || '',
      };

      console.error('Invalid login data from API');
    }

    if (!object.location || !object.location.city ||
      !object.location.postcode || !object.location.street) {

      object.location = {
        city: object.login.city || '',
        postcode: object.login.postcode || '',
        street: object.login.street || '',
      };

      console.error('Invalid location data from API');
    }

    if (!object.email) {
      object.email = '';

      console.error('Invalid email data from API');
    }

    if (!object.cell) {
      object.cell = '';

      console.error('Invalid cell phone data from API');
    }

    if (!object.phone) {
      object.phone = '';

      console.error('Invalid phone data from API');
    }

    if (!object.registered) {
      object.registered = '';

      console.error('Invalid registration date data from API');
    }

    if (!object.picture || !object.picture.large) {

      object.picture = {
        large: object.picture.large || '',
      };

      console.error('Invalid avatar data from API');
    }

    return object;
  }

  /**
   * Get into data provided by this specific API
   * @param data
   * @returns {*}
   */
  getDataFromResponse (data) {
    return data.results[0];
  }

  /**
   *
   * @param endpoint
   * @returns {*}
   */
  getUser(endpoint) {
    // Get data as a parsed object from the API and validate it
    return super.getUser(endpoint, this);
  }
}
