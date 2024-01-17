<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once("rest.php");
require_once("api.php");
class db {
    private $conn;
    function __construct() {
        $this->conn = new SQLite3('database.db');
        $this->createTable();
    }
    function createTable() {
        $this->conn->exec("
            CREATE TABLE IF NOT EXISTS task (
                id INTEGER PRIMARY KEY, 
                title TEXT, 
                category TEXT CHECK( category IN ('matematyka', 'fizyka', 'informatyka')),
                description TEXT, 
                date DATE DEFAULT CURRENT_DATE,
                state TEXT CHECK(state IN ('wysłane', 'w trakcie realizacji', 'wykonane'))
            )
        ");
    }
    function select($category = null, $id_task = null, $state = null) {
        $query = 'SELECT * FROM task';
        $conditions = [];
        if ($category) $conditions[] = "category = '$category'";
        if ($id_task) $conditions[] = "id = $id_task";
        if ($state) $conditions[] = "state = '$state'";
        if ($conditions) $query .= ' WHERE ' . implode(' AND ', $conditions);
        $results = $this->conn->query($query);
        $table = array();
        while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
            $table[] = $row;
        }
        return $table;
    }
    function insert($task) {
        $stmt = $this->conn->prepare('INSERT INTO task (title, description, category, state) VALUES (:title, :description, :category, :state)');
        $stmt->bindValue(':title', $task['title']);
        $stmt->bindValue(':description', $task['description']);
        $stmt->bindValue(':category', $task['category']);
        $stmt->bindValue(':state', $task['state']);
        $ret = $stmt->execute();
        return $ret;
    }
    function update($id_task, $task) {
        $stmt = $this->conn->prepare('UPDATE task SET state = :state WHERE id = :id');
        $stmt->bindValue(':state', $task['state']);
        $stmt->bindValue(':id', $id_task);
        $ret = $stmt->execute();
        return $ret->changes();
    }
}
?>