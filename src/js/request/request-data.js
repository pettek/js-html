import { Request } from './request';

/**
 * Encapsulates making multiple request at once. Not used anymore.
 */
export class RequestData {
  /**
   * @constructor Represent the request to the API
   * @param baseUrl
   */
  constructor (baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * Make Promises for every call to API. Number of calls is specified in
   * howMany parameter which defaults to 1 to path relative to the one fed to
   * the constructor and specified in relPath parameter
   * @param relPath
   * @param howMany
   * @returns {Promise<[*]>}
   */
  makeMultipleCalls (relPath, howMany = 1) {
    const promises = [];


    // Fill the array with as many promises as specified
    for (let i = 0; i < howMany; i++) {
      promises.push(new Request(this.baseUrl).get(relPath));
    }

    /*
     * Return a single promise that fails if any of the promises given as an
     * argument fail
     */
    return Promise.all(promises);
  }
}