export class FormHandler {
  readForm() {
    return {};
  }
  create(formData) {}

  constructor (form) {
    this.form = form;
  }

  listen (callback) {
    this.form.addEventListener('submit', function (event) {
      event.preventDefault();
      const formData = this.readForm();
      callback(this.create(formData));
    }.bind(this));
  }
}