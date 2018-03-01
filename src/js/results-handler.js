const SPINNER = '<i class="fa fa-circle-o-notch fa-spin text-primary" ' +
  'style="font-size: 1.5em; margin-top: 0.25em"></i>';

export class ResultsHandler{
  constructor (resultsContainer, spinner) {
    this.resultsContainer = resultsContainer;
    this.spinner = spinner;
  }

  /**
   * Clear container before displaying anything, so we avoid appending new users
   * indefinitely
   */
  clear () {
    this.resultsContainer.innerHTML = '';
    return this;
  }

  /**
   * Show loader
   */
  loaderOn () {
    this.spinner.innerHTML = SPINNER;
    return this;
  }

  /**
   * Hide loader
   */
  loaderOff () {
    this.spinner.innerHTML = '';
    return this;
  }

  /**
   * Show data in the container without any changes to it.
   * This method needs to be overridden if dealing the different types of data.
   * @param data
   */
  display(data) {
    this.resultsContainer.innerHTML = data;
  }
}