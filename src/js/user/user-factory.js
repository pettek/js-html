import { APIUserDirector }       from './api-user-director';
import { CustomAPIUserDirector } from './custom-api-user-director';
import { Request }               from '../request/request';

/**
 * Encapsulates creating a promise of a User
 */
export class UserFactory {
  /**
   * Returns one promise of a User from an API
   * The API is randomly picked
   *
   * @returns {Promise<User>}
   */
  static getUser () {
    let API = '';
    let endpoint = '';
    let director = null;

    if (Math.random() > 0.5) {

      API = 'https://randomuser.me';
      endpoint = '/api';

      director = new APIUserDirector(
        new Request(API),
      );
    } else {

      API = 'http://192.168.109.247:8080';
      endpoint = '/api/user/random';

      director = new CustomAPIUserDirector(
        new Request(API),
      );
    }
    return director.getUser(endpoint);
  }
}