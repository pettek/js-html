import { UserBuilder } from './user-builder';

/**
 * Supervises the process of building the User
 */
export class APIUserDirector {
  constructor (requestManager) {
    this.builder = new UserBuilder;
    this.requestManager = requestManager;
  }

  static validateJSONObject (object) {
    return new Promise((resolve, reject) => {
      if (!object) {
        reject('JSON returned from API invalid');
      }

      if (!object.name || !object.name.first || !object.name.last) {
        reject('Invalid name data from API');
      }

      if (!object.gender) {
        reject('Invalid gender data from API');
      }

      if (!object.login || !object.login.username || !object.login.salt ||
        !object.login.sha256) {
        reject('Invalid login data from API');
      }

      if (!object.location || !object.location.city ||
        !object.location.postcode || !object.location.street) {
        reject('Invalid location data from API');
      }

      if (!object.email) {
        reject('Invalid email data from API');
      }

      if (!object.cell) {
        reject('Invalid cell phone data from API');
      }

      if (!object.phone) {
        reject('Invalid phone data from API');
      }

      if (!object.registered) {
        reject('Invalid registation date data from API');
      }

      if (!object.picture || !object.picture.large) {
        reject('Invalid avatar data from API');
      }

      resolve();

    });
  }

  static parseAPIResponse (data) {
    return data.results[0];
  }

  /**
   * Builds the user using builder and provided data
   * @returns {Promise<[*]>}
   */

  getUser (endpoint) {
    return new Promise((resolve, reject) => {
      this.requestManager.get(endpoint).then((userData) => {

        // Get data as a parsed object from the API
        const object = APIUserDirector.parseAPIResponse(userData);


        // Validate very thoroughly what API sent back
        APIUserDirector.validateJSONObject(object).then(() => {

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
               setRegistrationDate(Date(object.registered));

          // And resolve the promise with it
          resolve(user.build());

        }).catch(error => reject(error));


      }).catch((error => {

        reject(error);

      }));
    });
  }
}