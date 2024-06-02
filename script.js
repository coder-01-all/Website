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

        // Assuming the CSV structure is "username,password"
        if (fields.length >= 2) {
            const username = fields[0];
            const password = fields[1];

            // Add the user to the users array
            users.push({ username, password });
        } else {
            console.error(`Invalid CSV format on line ${i + 1}: ${line}`);
        }
    }

    return users;
}

// Fetch the CSV file from the provided URL
fetch('https://drive.google.com/uc?export=download&id=1G1Bx58F0ovAYmxUXj3kXdiwuVTOr15i3')
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
    })
    .catch(error => console.error('Error:', error));
