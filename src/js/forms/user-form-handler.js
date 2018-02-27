import { User }          from '../user';
import { FormHandler }   from './form-handler';
import { FormValidator } from './form-validator';

export class UserFormHandler extends FormHandler {

  /**
   * readFrom reads the data from the form fields and organize them into an
   * object. This function also performs some basic transformation of form data
   * to make it either a string, an array or boolean (not NodeList for example)
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
   * This function accepts previously formed object and re-writes data into a
   * User object and returns it. There is an additional step of validation that
   * is optional and will result in returning null instead of a User object if
   * criteria are not met
   *
   * @param formData
   * @returns {*}
   */
  create (formData) {


    // Validation step
    const validator = new FormValidator(formData,
      {
        name: 'required|min:6|max:30',
        telephone: 'required|number',
        programmingLanguages: 'required',
      },
    );
    const errorHandler = (errors) => (errors.map(
      error => console.log(' --- ' + error)));

    if (validator.validate(errorHandler) === false) {
      // Return null on validation failure
      return null;
    }

    // Will go here, if validation is successful
    const user = new User;

    user.name = formData.name;
    user.telephone = formData.telephone;
    user.address = formData.address;
    user.notes = formData.notes;
    user.programmingLanguages = formData.programmingLanguages;
    user.isWorkPermitNeeded = formData.isWorkPermitNeeded;

    return user;
  }

  /**
   * Add submit event listener on a form provided in the constructor. Returns a
   * Promise that will be resolved on submitting a form.
   * @returns {Promise<any>}
   */
  getUserPromise () {
    const object = this;
    return new Promise(function (resolve, reject) {
      // object.form.addEventListener('submit', function (event) {
      //   event.preventDefault();
      const newUser = object.create(
        object.readForm(),
      );
      if (newUser) {
        resolve(newUser);
      } else {
        reject('Validation failed');
      }
    });
    // });
  }
}