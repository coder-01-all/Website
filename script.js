document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/server/users.csv')
        .then(response => response.text())
        .then(data => {
            const users = parseCSV(data);
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                alert('Login successful!');
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
