export class FormHandler {
  /**
   *
   * @returns {{}}
   */
  readForm () {
    return {};
  }

  /**
   *
   * @param formData
   */
  create (formData) {}

  /**
   *
   * @param form
   */
  constructor (form) {
    this.form = form;
  }

  /**
   *
   * @param callback
   */
  listen (callback) {
    this.form.addEventListener('submit', function (event) {
      event.preventDefault();
      const formData = this.readForm();
      callback(this.create(formData));
    }.bind(this));
  }
}