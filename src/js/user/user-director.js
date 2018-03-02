/**
 * Supervises the process of building the User
 */
export class APIUserDirector {
  constructor (builder, requestManager) {
    this.builder = builder;
    this.requestManager = requestManager;
  }

  static parseAPIResponse(data) {
    return data.results[0];
  }

  /**
   * Builds the user using builder and provided data
   * @returns {User[]}
   */

  buildUsersArray(){
    const usersArray = [];

    this.requestManager.makeMultipleCalls('/api', 2).then(userDataArray => {
      userDataArray.forEach(userData => {
        const user = this.builder.create();
        const object = APIUserDirector.parseAPIResponse(userData);

        user.setFirstName(object.name.first);
        usersArray.push(user.build());
      })
    });

    return usersArray;
  }
}