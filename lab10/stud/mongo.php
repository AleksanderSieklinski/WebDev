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
        $this->conn->exec('CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY, fname TEXT, lname TEXT, faculty TEXT, year INTEGER)');
    }

    function select() {
        $results = $this->conn->query('SELECT * FROM student');
        $table = array();
        while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
            $table[] = $row;
        }
        return $table;
    }

    function insert($user) {
        $stmt = $this->conn->prepare('INSERT INTO student (fname, lname, faculty, year) VALUES (:fname, :lname, :faculty, :year)');
        $stmt->bindValue(':fname', $user['fname']);
        $stmt->bindValue(':lname', $user['lname']);
        $stmt->bindValue(':faculty', $user['faculty']);
        $stmt->bindValue(':year', $user['year']);
        $ret = $stmt->execute();
        return $ret;
    }

    function update($ident, $user) {
        $stmt = $this->conn->prepare('UPDATE student SET fname = :fname, lname = :lname, faculty = :faculty, year = :year WHERE id = :id');
        $stmt->bindValue(':fname', $user['fname']);
        $stmt->bindValue(':lname', $user['lname']);
        $stmt->bindValue(':faculty', $user['faculty']);
        $stmt->bindValue(':year', $user['year']);
        $stmt->bindValue(':id', $ident);
        $ret = $stmt->execute();
        return $ret->changes();
    }

    function delete($ident) {
        $stmt = $this->conn->prepare('DELETE FROM student WHERE id = :id');
        $stmt->bindValue(':id', $ident);
        $ret = $stmt->execute();
        return $ret->changes();
    }
}
?> 