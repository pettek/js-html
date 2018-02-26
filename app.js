import { User } from './src/js/User';

const button = document.getElementById('submit-btn');
button.addEventListener('click', function () {
  const user = new User;
  user.name = document.getElementById('full-name').value;
  user.telephone = document.getElementById('phone').value;
  user.address = document.getElementById('address').value;
  user.notes = document.getElementById('notes').value;
  user.languages = document.querySelectorAll('[name="languages[]"]:checked');
  user.isWorkPermitNeeded = document.querySelector(
    '[name="work-permit"]:checked');

  console.log(user.name);
});