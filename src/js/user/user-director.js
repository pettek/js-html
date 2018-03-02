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
   * Builds the user using builder and provided data
   * @returns {Promise<[*]>}
   */

  getUsersArray (howMany) {
    const usersArray = [];

    return new Promise((resolve, reject) => {
      this.requestManager.makeMultipleCalls('/api', howMany).
           then(userDataArray => {
             userDataArray.forEach(userData => {
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

               usersArray.push(finalUser);
             });
             resolve(usersArray);
           }).catch((error => {
             reject(error);
      }));
    });
  }
}