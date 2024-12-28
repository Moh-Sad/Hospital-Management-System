const form = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    errorMessage.textContent = '';

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.error || "Login failed") });
        }
        return response.json();
    })
    .then(data => {
        window.location.href = '/dashboard.html';
    })
    .catch((error) => {
        console.error('Error:', error);
        errorMessage.textContent = error.message;
    });
});