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
        if (this.readyState === 4 && this.status === 200) {
          const result = JSON.parse(this.response).results;
          resolve(result);
        }
      };

      req.open('GET', completePath);
      req.send();
    });
  }
}