<?php
$host = 'localhost';
$port = '3306';
$db = 'tictactoe';
$user = 'mysqluser';
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
} catch (\PDOException $e) {
    // Log the error message to a file or monitoring system
    error_log("Database connection failed: " . $e->getMessage());
    
    // Display a user-friendly message
    echo "We are experiencing technical difficulties. Please try again later.";
    exit();
}

