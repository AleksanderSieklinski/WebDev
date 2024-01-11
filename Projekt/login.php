<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start();
$db = new SQLite3('users.db');
$db->exec('CREATE TABLE IF NOT EXISTS users (username STRING, password STRING, velocity REAL, angle REAL, height REAL, gravity REAL, airResistanceCoefficient REAL)');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['register'])) {
        if (isset($_POST['username']) && isset($_POST['password'])) {
            $stmt = $db->prepare('SELECT * FROM users WHERE username = :username');
            $stmt->bindValue(':username', $_POST['username']);
            $result = $stmt->execute();
            $user = $result->fetchArray();
            if ($user) {
                $_SESSION['message'] = "This username is already taken. Please choose a different one.";
                header('Location: index.php');
                exit;
            } else {
                $hashedPassword = password_hash($_POST['password'], PASSWORD_DEFAULT);
                $stmt = $db->prepare('INSERT INTO users (username, password) VALUES (:username, :password)');
                $stmt->bindValue(':username', $_POST['username']);
                $stmt->bindValue(':password', $hashedPassword);
                $stmt->execute();
                $_SESSION['logged_in'] = true;
                $_SESSION['username'] = $_POST['username'];
                header('Location: index.php');
                exit;
            }
        }
    } else if (isset($_POST['login'])) {
        if (isset($_POST['username']) && isset($_POST['password'])) {
            $stmt = $db->prepare('SELECT * FROM users WHERE username = :username');
            $stmt->bindValue(':username', $_POST['username']);
            $result = $stmt->execute();
            $user = $result->fetchArray();
            if ($user && password_verify($_POST['password'], $user['password'])) {
                $_SESSION['logged_in'] = true;
                $_SESSION['username'] = $_POST['username'];
                header('Location: index.php');
                exit;
            } else {
                $error = 'Invalid username or password';
                header('Location: index.php');
            }
        }
    }
}
?>