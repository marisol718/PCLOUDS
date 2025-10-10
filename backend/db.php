<?php
$host = "Localhost";
$user = "root";
$pass = "";
$dbname = "pclouds";

$conn = new mysqli($host, $user, $pass, $dbname, 3306);
if ($conn->connect_error) {
    die("Error de conexion;" . $conn->connect_error);
}
?>