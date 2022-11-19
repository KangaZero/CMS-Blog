const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      email.value="";
      password.value="";

      email.placeholder = 'Invalid';
      email.classList.add('border-rose-700');

      password.placeholder = 'Invalid';
      password.classList.add('border-rose-700');
    }
  }
};


document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);

