const login = async (event) => {
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

      const emailEl = document.querySelector('#email-login');
      const passwordEl = document.querySelector('#password-login');

      passwordEl.value='';
      passwordEl.value='';

      passwordEl.placeholder = 'Invalid';
      passwordEl.classList.remove('border-gray-300');
      passwordEl.classList.add('border-rose-700');

      emailEl.placeholder = 'Invalid';
      emailEl.classList.remove('border-gray-300');
      emailEl.classList.add('border-rose-700');
    }
  }
};


document
  .querySelector('#login-form')
  .addEventListener('submit', login);

