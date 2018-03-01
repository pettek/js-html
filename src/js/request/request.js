const HttpOKStatus = 200;

export class Request {
  /**
   * @constructor Represent a generic Request
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

        if (this.readyState === XMLHttpRequest.DONE &&
          this.status === HttpOKStatus) {
          const result = JSON.parse(this.response);
          resolve(result);
        } else if (this.readyState === XMLHttpRequest.DONE &&
          this.status !== HttpOKStatus) {
          reject('Could not load data from API');
        }
      };

      req.open('GET', completePath, true);
      req.send();
    });
  }
}