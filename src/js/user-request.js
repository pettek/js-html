import { Request } from './request';

export class UserRequest {
  constructor (root) {
    this.root = root;
  }

  fetchUsers (howMany) {
    const promises = [];

    for (let i = 0; i < howMany; i++) {
      promises.push(new Request('https://randomuser.me').get('/api'));
    }

    return Promise.all(promises);
  }
}