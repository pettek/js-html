export class CustomFilter {

  /**
   * Accept the object where every key has a callback. Settings must have
   * at least one key: "default"
   * @param settings
   */
  constructor (settings) {
    this.settings = settings;
  }
  /**
   * Returns a filter callback based on the value of filterInput or default if
   * none provided or none of the keys in the settings matches filterInput
   *
   * @param filterInput
   * @returns {function(*): boolean}
   */
  chooseFilter (filterInput) {
    return this.settings[filterInput] || this.settings.default;
  }
}
