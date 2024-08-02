<?php
// register.php
session_start();
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $name = $_POST['name'];
    $location = $_POST['location'];
    $profile_picture = $_POST['profile_picture']; // This could be a URL or a file upload handling logic

    // Insert user into the database
    $stmt = $pdo->prepare("INSERT INTO users (username, name, location, profile_picture) VALUES (?, ?, ?, ?)");
    try {
        $stmt->execute([$username, $name, $location, $profile_picture]);
        echo 'User registered successfully!';
    } catch (PDOException $e) {
        if ($e->getCode() == '23505') { // Unique constraint violation code
            echo 'Username already taken.';
        } else {
            echo 'Error: ' . $e->getMessage();
        }
    }
}
?>

<!-- HTML Form for registration -->
<form method="post" action="register.php">
    <label>Username:</label>
    <input type="text" name="username" required>
    <label>Name:</label>
    <input type="text" name="name" required>
    <label>Location:</label>
    <input type="text" name="location">
    <label>Profile Picture:</label>
    <input type="text" name="profile_picture">
    <input type="submit" value="Register">
</form>
