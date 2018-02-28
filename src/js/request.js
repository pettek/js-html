export class Request {
  /**
   * @constructor
   * @param baseUrl
   */
  constructor (baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * Returns a Promise for an HTTP get request to a specific path
   * @param relativePath
   * @returns {Promise<any>}
   */
  get (relativePath) {
    const completePath = this.baseUrl + relativePath;
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          const result = JSON.parse(this.response).results;
          resolve(result);
        } else if (this.readyState === XMLHttpRequest.DONE &&
          this.status !== 200) {
          reject('Could not load data from API');
        }
      };

      req.open('GET', completePath);
      req.send();
    });
  }
}