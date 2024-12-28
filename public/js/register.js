const form = document.getElementById('registerForm');
const errorMessage = document.getElementById('errorMessage');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    errorMessage.textContent = '';

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    if (password.length < 8) {
        errorMessage.textContent = "Password must be at least 8 characters.";
        return;
    }

    fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {throw new Error(err.error || "Registration failed")});
        }
        return response.json();
    })
    .then(data => {
        alert(data.message || "Registration successful!");
        form.reset();
    })
    .catch((error) => {
        console.error('Error:', error);
        errorMessage.textContent = error.message;
    });
});