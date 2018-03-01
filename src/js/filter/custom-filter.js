/**
 * Custom filter does custom filtering xD
 */
export class CustomFilter {
  /**
   * Accept the object where every key has a callback. Settings should have
   * at least one key: "default". If not, dummy default filter will be provided
   * (It will not filter out anything)
   *
   * @param settings
   */
  constructor (settings) {
    this.settings = settings;
    if (!this.settings.default) {
      this.settings.default = (data) => true;
    }
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
