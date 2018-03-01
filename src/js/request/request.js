const HttpOKStatus = 200;

export class Request {
  /**
   * @constructor Represent a generic Request
   * @param baseUrl
   */
  constructor (baseUrl = '') {
    this.baseUrl = baseUrl || '';
  }

  /**
   * Try to create a correct path for the API call, two checks are performed
   *  1) if there are any whitespaces in either base or relative path -> delete
   *    them (the first of the chained replace methods)
   *  2) if there are forward slashes in the beginning of in the end of either
   *    base or relative path -> delete them, the necessary forward slash will
   *    be concatenated (the second of the chained replace methods)
   * @static
   * @param baseUrl
   * @param relPath
   * @returns {string}
   */
  static createPath (baseUrl, relPath) {

    baseUrl = baseUrl.replace(/\s/g, '').replace(/^\/|\/$/g, '');
    relPath = relPath.replace(/\s/g, '').replace(/^\/|\/$/g, '');

    const separator = (baseUrl === '') ? '' : '/';

    return baseUrl + separator + relPath;
  }

  /**
   * Returns a Promise for an HTTP get request to a specific path
   * @param relativePath
   * @returns {Promise<any>}
   */
  get (relativePath = '') {
    const completePath = Request.createPath(this.baseUrl, relativePath);

    return new Promise((resolve, reject) => {

      if(completePath === '') {
        reject('Please provide some path to API');
      }

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