import {UserBuilder} from './user-builder';

/**
 * Supervises the process of building the User
 */
export class APIUserDirector {
  constructor (requestManager) {
    this.builder = new UserBuilder;
    this.requestManager = requestManager;
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

        // Start with the empty User
        const user = this.builder.create();

        // Get data as a parsed object from the API
        const object = APIUserDirector.parseAPIResponse(userData);

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

      }).catch((error => {

        reject(error);

      }));
    });
  }
}