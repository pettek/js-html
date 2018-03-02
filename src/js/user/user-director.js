/**
 * Supervises the process of building the User
 */
export class APIUserDirector {
  constructor (builder, requestManager) {
    this.builder = builder;
    this.requestManager = requestManager;
  }

  static parseAPIResponse (data) {
    return data.results[0];
  }

  /**
   * @todo FIX THAT
   * Builds the user using builder and provided data
   * @returns {Promise<[*]>}
   */

  getUser (endpoint) {
    return new Promise((resolve, reject) => {
      this.requestManager.get(endpoint).then((userData) => {
        const user = this.builder.create();
        const object = APIUserDirector.parseAPIResponse(userData);

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

        const finalUser = user.build();

        resolve(finalUser);
      }).catch((error => {
        reject(error);
      }));
    });
  }
}