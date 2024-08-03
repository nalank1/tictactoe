<?php
$host = 'localhost';
$port = '3306';
$db = 'tictactoe';
$user = 'your_username';
$pass = 'Tokyo.677*';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    echo "Database connection successful!";

    // Test query to verify connection
    $stmt = $pdo->query('SELECT 1');
    $result = $stmt->fetch();
    if ($result) {
        echo "Test query successful!";
    }
} catch (\PDOException $e) {
    echo "Database connection failed: " . $e->getMessage();
    exit();
}
