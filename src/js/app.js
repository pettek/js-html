import { UserController } from './controllers/user-controller';

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
   * Create all events that will enable for this app to run requests to a
   * specific API
   */
  run () {
    this.userController.init();
  }
}