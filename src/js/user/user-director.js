/**
 * Supervises the process of building the User
 */
export class UserDirector {
  constructor (builder) {
    this.builder = builder;
  }

  /**
   * Builds the user using builder and provided data
   * @param data
   * @returns {User}
   */
  buildUser(data){
    return this.builder
      .create()
      .setFirstName('Imię')
      .setLastName('Nazwisko')
      .setAddress('Miasto', '12-345', 'Adresowa 1/1')
      .build();
  }
}