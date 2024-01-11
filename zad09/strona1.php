<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start();
if (isset($_GET['logout'])) {
    unset($_SESSION['logged_in']);
    header('Location: login.php');
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Strona 1</title>
    <style>
    body {
        background-color: <?php echo isset($_COOKIE['bg_color']) ? $_COOKIE['bg_color'] : 'white'; ?>;
    }
    </style>
    <link rel="stylesheet" type="text/css" href="zad9.css"></link>
</head>
<body>
    <?php if (isset($_SESSION['logged_in'])): ?>
        <button onclick="window.location.href='strona1.php?logout=true'">Log out</button>
        <button onclick="window.location.href='strona3.php'">Go to restricted page</button>
    <?php else: ?>
        <button onclick="window.location.href='login.php'">Log in</button>
    <?php endif; ?>
    <button onclick="changeBgColor()">Change background color</button>
    <button onclick="window.location.href='strona2.php'">Go next</button>
    <script type="text/javascript" src="zad9.js"></script>
</body>
</html>