document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log(`Attempting to login with username: ${username} and password: ${password}`);

    fetch('/server/users.csv')
        .then(response => response.text())
        .then(data => {
            console.log('CSV Data:', data);

            const users = parseCSV(data);
            console.log('Parsed Users:', users);

            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                alert('Login successful!');
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
});

function parseCSV(data) {
    const lines = data.split('\n');
    const users = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
            const [username, password, redirectUrl] = line.split(',');
            users.push({ username, password, redirectUrl });
        }
    }

    return users;
}
