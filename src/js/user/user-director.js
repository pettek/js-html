import { UserBuilder }     from './user-builder';

/**
 * Supervises the process of building the User
 */
export class UserDirector {
  /**
   * @constructor Represents the director in Builder Pattern
   * @param requestManager
   */
  constructor (requestManager) {
    this.builder = new UserBuilder;
    this.requestManager = requestManager;
  }

  getUser (endpoint, callingDirector) {
    return new Promise((resolve, reject) => {
      this.requestManager.get(endpoint).then((userData) => {
        const object = callingDirector.validateJSONObject(
          callingDirector.getDataFromResponse(userData));

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