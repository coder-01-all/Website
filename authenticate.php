<?php
header('Content-Type: application/json');

$users = [
    'user1' => ['password' => 'password1', 'redirectUrl' => 'https://www.google.com'],
    'user2' => ['password' => 'password2', 'redirectUrl' => 'https://www.facebook.com'],
    'user3' => ['password' => 'password3', 'redirectUrl' => 'index.html']
];

$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];
$password = $data['password'];

if (isset($users[$username]) && $users[$username]['password'] === $password) {
    echo json_encode(['success' => true, 'redirectUrl' => $users[$username]['redirectUrl']]);
} else {
    echo json_encode(['success' => false]);
}
?>
