<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Strona 2</title>
    <style>
    body {
        background-color: <?php echo isset($_COOKIE['bg_color']) ? $_COOKIE['bg_color'] : 'white'; ?>;
    }
    </style>
    <link rel="stylesheet" type="text/css" href="zad9.css"></link>
</head>
<body>
    <p>This is some text for all visitors.</p>
    <button onclick="goBack()">Go Back</button>
    <button onclick="window.location.href='strona3.php'">Go next</button>
    <script type="text/javascript" src="zad9.js"></script>
</body>
</html>