import { User }        from '../user';
import { FormHandler } from './form-handler';

export class UserFormHandler extends FormHandler {
  readForm () {
    return {
      name: this.form.querySelector('#full-name').value,
      telephone: this.form.querySelector('#phone').value,
      address: this.form.querySelector('#address').value,
      notes: this.form.querySelector('#notes').value,
      languages: this.form.querySelectorAll('[name="languages[]"]:checked'),
      isWorkPermitNeeded: this.form.querySelector(
        '[name="work-permit"]:checked'),
    };
  }

  create (formData) {
    const user = new User;

    user.name = formData.name;
    user.telephone = formData.telephone;
    user.address = formData.address;
    user.notes = formData.notes;
    user.languages = formData.languages;
    user.isWorkPermitNeeded = formData.isWorkPermitNeeded;

    return user;
  }
}