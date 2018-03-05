import { UserController }                from './controllers/user-controller';

/**
 * Class representing the application
 */
export class App {
  /**
   * @constructor
   * @param root
   */
  constructor (root) {
    this.root = root;
    this.userController = new UserController(this.root);
  }

  /**
   * Keeps all the DOM assignments in one place
   */
  assignElements () {
    this.callBtn = this.root.querySelector('.request-btn');
    this.clearBtn = this.root.querySelector('.clear-btn');
  }

  /**
   * Create all events that will enable for this app to run requests to a
   * specific API
   */
  run () {
    this.assignElements();

    // Bind click to making multiple requests to API and rendering results
    this.callBtn.addEventListener('click', () => {
      this.userController.fetchFromAPI();
    });

    // Clear the container if button responsible of clearing is pressed
    this.clearBtn.addEventListener('click', () => {
      this.userController.clearDisplay();
    });
  }
}