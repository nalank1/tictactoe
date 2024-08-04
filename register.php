<?php
// register.php
session_start();
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $name = $_POST['name'];
    $location = $_POST['location'];
    

    $stmt = $pdo->prepare("INSERT INTO users (username, name, location) VALUES (?, ?, ?)");
    try {
        $stmt->execute([$username, $name, $location]);
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
