const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector('#logout')
  .addEventListener('click', logout);
// Doing logout() may automatically call the function upon the page rendering
// Had this issue when signing in, it would document.location.replace('/'); then immediately logout().
// Function does not work when #logout is an "anchor" tag. Therefore, changed to "button"
