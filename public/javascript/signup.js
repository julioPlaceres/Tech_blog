async function signupFormHandler(event) {
  event.preventDefault();

  // Get all elements
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const github = document.querySelector('#github-signup').value.trim();

  // If username, email and password, then send request
  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        github,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    // If data is okat then sender dashboard view
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);