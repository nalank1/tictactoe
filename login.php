<?php
// login.php
session_start();
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];

    // Fetch user from the database
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['name'] = $user['name'];
        header('Location: index.php');
        exit();
    } else {
        echo 'Invalid username or password';
    }
}
?>

<!-- HTML Form for login -->
<form method="post" action="login.php">
    <label>Username:</label>
    <input type="text" name="username" required>
    <input type="submit" value="Login">
</form>
