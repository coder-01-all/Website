document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulated in-memory user store with redirection URLs
    const users = [
        { username: 'user1', password: 'password1', redirectUrl: 'https://www.google.com' },
        { username: 'user2', password: 'password2', redirectUrl: 'https://www.facebook.com' },
        { username: 'user3', password: 'password3', redirectUrl: 'index.html' }
        // Add more users with their respective redirection URLs here
    ];

    // Check if user exists
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Redirect the user to the specified URL
        window.location.href = user.redirectUrl;
    } else {
        alert('Invalid credentials');
    }
});
