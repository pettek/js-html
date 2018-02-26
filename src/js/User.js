export class User {
  constructor () {
    this.firstName = '';
    this.lastName = '';
    this.telephone = '';
    this.address = '';
    this._programmingLanguages = [];
    this.notes = '';
    this._isWorkPermitNeeded = false;
    this.index = 0;
  }

  get name () {
    return this.firstName + ' ' + this.lastName;
  }

  set name (fullName) {
    const nameArray = fullName.split(' ');
    this.firstName = nameArray[0];
    this.lastName = nameArray[1];
  }

  set languages (languages) {
    for (let i = 0; i < languages.length; i++) {
      this._programmingLanguages.push(languages[i].value);
    }
  }

  set isWorkPermitNeeded (workPermit) {
    if(workPermit) {
      this._isWorkPermitNeeded = (workPermit.value === 'yes');
    }
  }
}