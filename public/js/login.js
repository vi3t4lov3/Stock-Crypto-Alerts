// login DOM
const emailEl = document.getElementById('email_login');
const passwordEl = document.getElementById('password_login');
const loginForm = document.getElementById('loginform');
console.log('Login')
const sendData = async (e) => {
    e.preventDefault();
    const body = {
        email: emailEl.value.trim(),
        password: passwordEl.value.trim()
    };
    if (body) {
        const response = await fetch('/api/user/login', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert('Please check you password & try again.');
        }
      }
    };
loginForm.addEventListener('submit', sendData);
