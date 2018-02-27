export class FormHandler {
  /**
   * This method should be overridden by a subclass.
   * @returns {{}}
   */
  readForm () {
    return {};
  }

  /**
   * This method should be overridden by a subclass.
   * @param formData
   */
  create (formData) {}

  /**
   * @constructor Represent a general form data handling.
   * @param form
   */
  constructor (form) {
    this.form = form;
  }

  /**
   * Accept a callback, which will be executed on form-data filled object
   * creation. Add submit event listener on a form provided in the constructor.
   * @param callback
   */
  listen (callback) {
    this.form.addEventListener('submit', function (event) {
      event.preventDefault();
      const formData = this.readForm();
      callback(this.create(formData));
    }.bind(this));
  }

  get submitButton () {
    return this.form.querySelector('button');
  }

}