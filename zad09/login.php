<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start();
$db = new SQLite3('users.db');
$db->exec('CREATE TABLE IF NOT EXISTS users (username STRING, password STRING)');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['register'])) {
        if (isset($_POST['username']) && isset($_POST['password'])) {
            $stmt = $db->prepare('INSERT INTO users (username, password) VALUES (:username, :password)');
            $stmt->bindValue(':username', $_POST['username']);
            $stmt->bindValue(':password', md5($_POST['password']));
            $stmt->execute();
            $success = 'Registration successful';
            header('Location: strona3.php');
        }
    } else if (isset($_POST['login'])) {
        if (isset($_POST['username']) && isset($_POST['password'])) {
            $stmt = $db->prepare('SELECT * FROM users WHERE username = :username');
            $stmt->bindValue(':username', $_POST['username']);
            $result = $stmt->execute();
            $user = $result->fetchArray();

            if ($user && md5($_POST['password']) == $user['password']) {
                $_SESSION['logged_in'] = true;
                $_SESSION['username'] = $_POST['username'];
                header('Location: strona3.php');
                exit;
            } else {
                $error = 'Invalid username or password';
            }
        }
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <link rel="stylesheet" type="text/css" href="zad9.css"></link>
    <style>
    body {
        background-color: <?php echo isset($_COOKIE['bg_color']) ? $_COOKIE['bg_color'] : 'white'; ?>;
    }
    </style>
</head>
<body>
    <form method="post">
        Username: <input type="text" name="username"><br>
        Password: <input type="password" name="password"><br>
        <input type="submit" name="login" value="Log in">
    </form>
    <?php if (isset($error)): ?>
        <p><?php echo $error; ?></p>
    <?php endif; ?>
    <form method="post">
        Username: <input type="text" name="username"><br>
        Password: <input type="password" name="password"><br>
        <input type="submit" name="register" value="Register">
    </form>
    <?php if (isset($success)): ?>
        <p><?php echo $success; ?></p>
    <?php endif; ?>
    <button onclick="goBack()">Go Back</button>
    <script type="text/javascript" src="zad9.js"></script>
</script>
</body>
</html>