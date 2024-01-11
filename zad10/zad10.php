<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL ^ E_DEPRECATED);
require 'vendor/autoload.php' ;
include 'mongo/mongo.php';

$db = new db();
$documents = $db->select();
// Insert a document
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $document = array( 
        "title" => $_POST['title'], 
        "description" => $_POST['description']
    );
    $db->insert($document);
    header("Location: zad10.php");
    exit;
}
// Delete a document
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['delete'])) {
    $db->delete($_GET['delete'], true);
    header("Location: zad10.php");
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Strona 1</title>
    <link rel="stylesheet" type="text/css" href="zad10.css"></link>
</head>
<body>
    <form method="POST">
        <label for="title">Title:</label><br><input type="text" name="title"><br>
        <label for="description">Description:</label><br><input type="text" name="description"><br>
        <input type="submit" value="Submit">
    </form>
    <table>
        <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Delete</th>
        </tr>
        <?php foreach ($documents as $document): ?>
            <?php if (isset($document["title"])): ?>
                <tr>
                    <td><?php echo $document["title"]; ?></td>
                    <td><?php echo $document["description"]; ?></td>
                    <td>
                        <form method="GET">
                            <input type="hidden" name="delete" value="<?php echo $document["_id"]; ?>">
                            <input type="submit" value="Delete">
                        </form>
                    </td>
                </tr>
            <?php else: ?>
                <?php $db->delete($document["_id"], true); ?>
            <?php endif; ?>
        <?php endforeach; ?>
    </table>
        <a>There are <?php echo count($documents); ?> documents in the collection.</a>
</body>
</html>