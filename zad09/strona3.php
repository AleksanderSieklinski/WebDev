<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start();
if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
    header('Location: login.php');
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Strona 3</title>
    <style>
    body {
        background-color: <?php echo isset($_COOKIE['bg_color']) ? $_COOKIE['bg_color'] : 'white'; ?>;
    }
    </style>
    <link rel="stylesheet" type="text/css" href="zad9.css"></link>
</head>
<body>
    <p>User info: <?php echo $_SESSION['username']; ?></p>
    <button onclick="goBack()">Go Back</button>
    <script type="text/javascript" src="zad9.js"></script>
</body>
</html>