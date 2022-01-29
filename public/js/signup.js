const signupHandler = async function (event) {
    event.preventDefault();
  
    const usernameEl = $('.user-name').val();
    const passwordEl = $('.user-password').val();
  
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({
        username: usernameEl,
        password: passwordEl,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to sign up');
    }
  };
  
  document
    .querySelector('.signup-button')
    .addEventListener('click', signupHandler)