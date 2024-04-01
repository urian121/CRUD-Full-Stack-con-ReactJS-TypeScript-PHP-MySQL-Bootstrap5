<?php

// Establecer encabezados CORS para permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require('configBD.php');
$metodo = $_SERVER['REQUEST_METHOD'];
$tbl_empleados = 'tbl_empleados';
$dirLocal = "fotos_empleados";
$extensionesPermitidas = array("jpg", "jpeg", "png", "gif");

switch ($metodo) {
    case 'GET':
        $query = "SELECT * FROM $tbl_empleados ORDER BY id DESC";
        $resultado = mysqli_query($con, $query);

        $usuarios = array();
        while ($fila = mysqli_fetch_assoc($resultado)) {
            $usuarios[] = $fila;
        }
        echo json_encode($usuarios);
        break;

    case 'POST':
        if (isset($_FILES['avatar'])) {
            $archivoTemporal = $_FILES['avatar']['tmp_name'];
            $nombreArchivo = $_FILES['avatar']['name'];

            $extension = strtolower(pathinfo($nombreArchivo, PATHINFO_EXTENSION));

            if (in_array($extension, $extensionesPermitidas)) {
                // Generar un nombre único y seguro para el archivo
                $nombreArchivo = substr(md5(uniqid(rand())), 0, 10) . "." . $extension;
                $rutaDestino = $dirLocal . '/' . $nombreArchivo;

                // Mover el archivo a la ubicación deseada
                if (move_uploaded_file($archivoTemporal, $rutaDestino)) {
                    $nombre = ucwords($_POST['nombre']);
                    $cedula = trim($_POST['cedula']);
                    $sexo = trim($_POST['sexo']);
                    $cargo = trim($_POST['cargo']);
                    $edad = trim($_POST['edad']);
                    $telefono = trim($_POST['telefono']);

                    $query = "INSERT INTO $tbl_empleados (nombre, cedula, sexo, cargo, edad, telefono, avatar) VALUES ('$nombre', '$cedula', '$sexo', '$cargo', '$edad', '$telefono', '$nombreArchivo')";
                    if (mysqli_query($con, $query)) {
                        // Consultar el último amigo insertado
                        $lastInsertedId = mysqli_insert_id($con);
                        $selectQuery = "SELECT * FROM $tbl_empleados WHERE id = $lastInsertedId";
                        $result = mysqli_query($con, $selectQuery);
                        $lastAmigo = mysqli_fetch_assoc($result);

                        // Devolver los detalles del último amigo como JSON
                        echo json_encode($lastAmigo);
                    } else {
                        echo json_encode(array('error' => 'Error al crear amigo: ' . mysqli_error($con)));
                    }
                } else {
                    echo json_encode(array('error' => 'Error al mover el archivo'));
                }
            } else {
                echo json_encode(array('error' => 'Tipo de archivo no permitido'));
            }
        }
        break;
}
mysqli_close($con);
