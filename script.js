document.addEventListener('DOMContentLoaded', function() {
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');

    if (savedUsername && savedPassword) {
        login(savedUsername, savedPassword, true);
    }

    document.getElementById('toggle-password').addEventListener('click', function () {
        const passwordInput = document.getElementById('password');
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.textContent = type === 'password' ? '👁️' : '🙈';
    });

    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        login(username, password, false);
    });
});

function login(username, password, isAutoLogin) {
    console.log(`Attempting to login with username: ${username}`);

    fetch('server/users.csv')
        .then(response => {
            console.log('Fetch response:', response); // Debugging line
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log('CSV Data:', data);

            const users = parseCSV(data);
            console.log('Parsed Users:', users);

            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                if (!isAutoLogin) {
                    // Save username and password to local storage
                    localStorage.setItem('username', username);
                    localStorage.setItem('password', password);
                }
                console.log('Redirecting to:', user.redirectUrl);
                window.location.href = user.redirectUrl;
            } else {
                alert('Invalid credentials');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
}

function parseCSV(data) {
    const lines = data.split('\n');
    const users = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
            const [username, password, redirectUrl] = line.split(',').map(item => item.trim());
            users.push({ username, password, redirectUrl });
        }
    }

    return users;
}
