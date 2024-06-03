document.getElementById('toggle-password').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    // Toggle the icon (optional, you can change the icon as per your preference)
    this.textContent = type === 'password' ? '👁️' : '🙈';
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log(`Attempting to login with username: ${username} and password: ${password}`);

// Function to parse the CSV data
function parseCSV(data) {
    const lines = data.split('\n');
    const users = [];

    // Iterate over each line
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Skip empty lines
        if (!line) continue;

        // Split the line into fields
        const fields = line.split(',');

        // Assuming the CSV structure is "username,password,redirectUrl"
        if (fields.length >= 3) {
            const username = fields[0];
            const password = fields[1];
            const redirectUrl = fields[2];

            // Add the user to the users array
            users.push({ username, password, redirectUrl });
        } else {
            console.error(`Invalid CSV format on line ${i + 1}: ${line}`);
        }
    }

    return users;
}

// Fetch the CSV file from your server
fetch('server/users.csv')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch CSV file');
        }
        return response.text();
    })
    .then(data => {
        // Parse the CSV data
        const users = parseCSV(data);

        // Now you have the array of users, you can use it for authentication
        console.log(users);

        // Example: Redirect user1 to '/server/No/VIkas/index.html'
        const user1 = users.find(user => user.username === 'user1');
        if (user1) {
            window.location.href = user1.redirectUrl;
        }
    })
    .catch(error => console.error('Error:', error));
