<?php
$usuario = "root";
$password = "";
$servidor = "localhost";
$basededatos = "crud_react_typescript_php";

$con = mysqli_connect($servidor, $usuario, $password, $basededatos);

if (!$con) {
    die("Error al conectar a la Base de Datos: " . mysqli_connect_error());
}
