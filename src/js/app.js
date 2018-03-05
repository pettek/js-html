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
   * Initialize controllers
   */
  run () {
    this.userController.init();
  }
}