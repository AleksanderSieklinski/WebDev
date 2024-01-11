<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start();
$db = new SQLite3('users.db');
if (isset($_SESSION['logged_in'])) {
    $stmt = $db->prepare('SELECT velocity, angle, height, gravity, airResistanceCoefficient FROM users WHERE username = :username');
    $stmt->bindValue(':username', $_SESSION['username']);
    $result = $stmt->execute();
    $user = $result->fetchArray();
    $velocity = $user['velocity'];
    $angle = $user['angle'];
    $height = $user['height'];
    $gravity = isset($user['gravity']) ? $user['gravity'] : 9.81;
    $airResistanceCoefficient = isset($user['airResistanceCoefficient']) ? $user['airResistanceCoefficient'] : 1;
} else {
    $gravity = 9.81;
    $airResistanceCoefficient = 1;
}
if (isset($_GET['logout'])) {
    unset($_SESSION['logged_in']);
    header('Location: index.php');
    exit;
}
if (isset($_SESSION['message'])) {
    echo '<script>alert("' . $_SESSION['message'] . '");</script>';
    unset($_SESSION['message']);
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Projectile Motion</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <header>
        <h1>Projectile Motion</h1>
    </header>
    <main>
    <div class="form-container">
    <nav>
        <?php
        if (isset($_SESSION['logged_in'])): ?>
            <button onclick="window.location.href='index.php?logout=true'">Wyloguj się</button>
        <?php else: ?>
            <form id="login" action="login.php" method="post">
                <input type="text" id="usernamelogin" name="username" placeholder="Username"><br>
                <input type="password" id="passwordlogin" name="password" placeholder="Password"><br>
                <input type="submit" name="login" value="Zaloguj się">
            </form>
            <form id="register" action="login.php" method="post">
                <input type="text" id="usernameregister" name="username" placeholder="Username"><br>
                <input type="password" id="passwordregister" name="password" placeholder="Password"><br>
                <input type="submit" name="register" value="Zarejestruj się">
            </form>
        <?php endif; ?>
    </nav>
    <form id="parameters" action="save_parameters.php" method="post">
        <label for="velocity">Początkowa prędkość(m/s):</label><br>
        <input type="number" id="velocity" name="velocity" step="any" value="<?php echo isset($velocity) ? $velocity : ''; ?>" required><br>
        <label for="angle">Kąt(°):</label><br>
        <input type="number" id="angle" name="angle" step="any" value="<?php echo isset($angle) ? $angle : ''; ?>" required><br>
        <label for="height">Początkowa wysokość(m):</label><br>
        <input type="number" id="height" name="height" step="any" value="<?php echo isset($height) ? $height : ''; ?>" required><br>
        <label for="gravity">Przyspieszenie grawitacyjne(m/s<sup>2</sup>):</label><br>
        <input type="number" id="gravity" name="gravity" step="any" value="<?php echo isset($gravity) ? $gravity : ''; ?>" required><br>
        <label for="airResistanceEnabled">Włączenie oporu powietrza:</label><br>
        <input type="checkbox" id="airResistanceEnabled" name="airResistanceEnabled" onchange="updateAirResistanceCoefficient(this.checked)">
        <br>
        <label for="airResistanceCoefficient">Współczynnik oporu powietrza(b/m*1000):(optymalnie 0-20)</label><br>
        <input type="number" id="airResistanceCoefficient" name="airResistanceCoefficient" step="any" value="0" disabled required><br>
        <input type="submit" value="Animate" name="animate">
    </form>
    <label for="planet">Wybierz planetę jakiej <br>grawitację chcesz sprawdzić:</label>
    <select id="planet" name="planet" onchange="setGravity(this.value)">
        <option value="3.7">Merkury</option>
        <option value="8.9">Wenus</option>
        <option value="9.81" selected>Ziemia</option>
        <option value="3.7">Mars</option>
        <option value="25.9">Jowisz</option>
        <option value="11.2">Saturn</option>
        <option value="8.6">Uran</option>
        <option value="11.2">Neptun</option>
    </select>
    <button type="button" id="saveParameters">Zapisz parametry użytkownika</button>
    <button type="button" id="goToPage">Sprawdź technologie na stronie</button>
    </div>
    <div class="explanation">
        <h2>Wyjaśnienie rzutu ukośnego</h2>
        <p><strong>Początkowa prędkość:</strong> Prędkość, z jaką pocisk jest wystrzeliwany. Wyższa początkowa prędkość skutkuje dłuższą i wyższą trajektorią.</p>
        <p><strong>Kąt:</strong> Kąt, pod którym pocisk jest wystrzeliwany, mierzony w stopniach od poziomu. Wyższy kąt skutkuje wyższą trajektorią, ale niekoniecznie dłuższą.</p>
        <p><strong>Początkowa wysokość:</strong> Wysokość nad ziemią, z której pocisk jest wystrzeliwany. Wyższa początkowa wysokość skutkuje dłuższym czasem lotu i wyższą trajektorią.</p>
        <p><strong>Przyspieszenie grawitacyjne:</strong> Przyspieszenie, z jakim ciało swobodnie spada w polu grawitacyjnym Ziemi. Na Ziemi wynosi ono około 9,81 m/s<sup>2</sup>.</p>
        <p><strong>Ruch pocisku:</strong> Ruch obiektu rzuconego lub wystrzelonego w powietrze, podlegającego tylko przyspieszeniu grawitacyjnemu. Obiekt nazywany jest pociskiem, a jego ścieżka to trajektoria.</p>
        <div class="formulas-container">
            <div class="formula">    
                <h3><strong>Wzory dla braku oporu powietrza:</strong></h3>
                <p>Wysokość maksymalna: <strong>h<sub>max</sub> = (v<sup>2</sup> * sin<sup>2</sup>(α)) / (2 * g)</strong></p>
                <p>Zasięg: <strong>R = (v<sup>2</sup> * sin(2 * α)) / g</strong></p>
                <p>Czas lotu: <strong>t = (2 * v * sin(α)) / g</strong></p>
                <h4><strong>Zmienne dla oporu powietrza:</strong></h4>
                <p>Beta: <strong>β = (b / m) * 1000</strong></p>
                <p>Vo: <strong>Vo = sqrt( (2 * g * h<sub>max</sub>) / (1 + β * t<sub>max</sub>) )</strong></p>
                <p>Vox: <strong>Vo<sub>x</sub> = Vo * cos(α)</strong></p>
                <p>Voy: <strong>Vo<sub>y</sub> = Vo * sin(α)</strong></p>
            </div>
            <div class="formula">
                <h3><strong>Wzory dla oporu powietrza:</strong></h3>
                <p><strong>Rozwiązania dla współrzędnych:</strong></p>
                <p>x(t) = Vo<sub>x</sub>β (1 - e<sup>-βt</sup>)</p>
                <p>y(t) = (Vo<sub>y</sub>β + gβ) (1 - e<sup>-βt</sup>) - gtβ</p>
                <p><strong>Rozwiązania dla prędkości:</strong></p>
                <p>V<sub>x</sub>(t) = Vo<sub>x</sub>e<sup>-βt</sup> = Vo e<sup>-βt</sup> cos(α)</p>
                <p>V<sub>y</sub>(t) = ( Vo<sub>y</sub> + gβ ) e<sup>-βt</sup> - gβ = ( Vo sin(α) + gβ ) e<sup>-βt</sup> - gβ</p>
            </div>
        </div> 
        <img src="rzut.png" alt="Rzut ukośny">  
    </div>
    </main>
    <canvas id="canvas" width="800" height="600"></canvas>
    <script>
    var isLoggedIn = <?php echo isset($_SESSION['logged_in']) ? 'true' : 'false'; ?>;
    var airResistanceCoefficient = <?php echo $airResistanceCoefficient; ?>;
    </script>
    <script src="script.js"></script>
</body>
</html>