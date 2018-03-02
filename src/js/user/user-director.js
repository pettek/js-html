/**
 * Supervises the process of building the User
 */
export class APIUserDirector {
  constructor (builder, requestManager) {
    this.builder = builder;
    this.requestManager = requestManager;
  }

  /**
   * Builds the user using builder and provided data
   * @param data
   * @returns {User}
   */
  buildUser(){
    return this.builder.create()
  }
}