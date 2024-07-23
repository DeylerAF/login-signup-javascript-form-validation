const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const repeatPassword = document.getElementById('repeat-password');


form.addEventListener('submit', (e) => {
  let errors = [];

  if (username) {
    errors = getSignUpErrors(username, email, password, repeatPassword);
  } else {
    errors = getSignInErrors(email, password);
  }

  if (errors.length > 0) {
    e.preventDefault();
  }
});

function getSignUpErrors(username, email, password, repeatPassword) {
  let errors = [];

  if (username.value === '' || username.value == null) {
    errors.push('Username is required');
    username.parentElement.classList.add('incorrect');
    username.placeholder = errors.join('. ');
  };


  function isValidEmail(email) {
    return email.includes('@');
  }
  if (email.value === '' || email.value == null) {
    errors.push('Email is required');
    email.parentElement.classList.add('incorrect');
    email.placeholder = errors.join('. ');
  } else if (!isValidEmail(email.value)) {
    errors.push('Email is not valid');
    email.parentElement.classList.add('incorrect');

    let errorMessage = document.createElement('p');
    errorMessage.className = 'error-message';
    email.parentElement.insertAdjacentElement('afterend', errorMessage);
    errorMessage.innerText = errors.join('. ');
  };

  if (password.value === '' || password.value == null) {
    errors.push('Password is required');
    password.parentElement.classList.add('incorrect');
  };

  if (password !== repeatPassword) {
    errors.push('Please repeat the password');
    repeatPassword.parentElement.classList.add('incorrect');
  }

  return errors;
}

const isValidInput = [username, email, password, repeatPassword]

isValidInput.forEach(input => {
  input.addEventListener('input', () => {
    if (input.parentElement.classList.contains('incorrect')) {
      input.parentElement.classList.remove('incorrect');
    }
  });
});