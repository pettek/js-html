import { App }     from './src/js/app';
import { Request } from './src/js/request';

new App(document.getElementById('root'));
new Request('https://randomuser.me/').get('api').then((data) => {
  // document.querySelector('.api-results').innerHTML = data;
  console.log(data);
});

