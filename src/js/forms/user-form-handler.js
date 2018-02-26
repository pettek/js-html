import { User }              from '../user';
import { FormHandler }       from './form-handler';
import { UserFormValidator } from './user-form-validator';

export class UserFormHandler extends FormHandler {
  /**
   *
   * @returns {{name, telephone, address, notes, programmingLanguages: any[], isWorkPermitNeeded: boolean}}
   */
  readForm () {
    return {
      name: this.form.querySelector('#full-name').value,
      telephone: this.form.querySelector('#phone').value,
      address: this.form.querySelector('#address').value,
      notes: this.form.querySelector('#notes').value,
      programmingLanguages: [].slice.call(this.form.querySelectorAll(
        '[name="languages[]"]:checked')).map(checkbox => checkbox.value),
      isWorkPermitNeeded: this.form.querySelector(
        '[name="work-permit"]:checked') ? this.form.querySelector(
        '[name="work-permit"]:checked').value === 'yes' : false,
    };
  }

  /**
   *
   * @param formData
   * @returns {*}
   */
  create (formData) {
    console.log(formData);
    const validator = new UserFormValidator(formData,
      {
        name: 'required|min:6|max:40',
        telephone: 'required|number',
        programmingLanguages: 'required',
        isWorkPermitNeeded: 'required',
      },
    );
    if (validator.validate() === false) {
      return null;
    }
    const user = new User;

    user.name = formData.name;
    user.telephone = formData.telephone;
    user.address = formData.address;
    user.notes = formData.notes;
    user.programmingLanguages = formData.programmingLanguages;
    user.isWorkPermitNeeded = formData.isWorkPermitNeeded;

    return user;
  }
}