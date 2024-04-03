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
        // Verificar si se ha proporcionado un ID en la cadena de consulta
        if (isset($_GET['id'])) {
            $id = mysqli_real_escape_string($con, $_GET['id']);
            $query = "SELECT id, nombre, cedula, sexo, cargo, edad, telefono, avatar FROM $tbl_empleados WHERE id = $id";
            $resultado = mysqli_query($con, $query);
            if (mysqli_num_rows($resultado) > 0) {
                // Si se encontró, obtener los datos y devolverlos como JSON
                $usuario = mysqli_fetch_assoc($resultado);
                echo json_encode($usuario);
            } else {
                echo json_encode(array('mensaje' => 'No se encontró ningún usuario con el ID proporcionado'));
            }
        } else {
            $query = "SELECT * FROM $tbl_empleados ORDER BY id DESC";
            $resultado = mysqli_query($con, $query);
            $usuarios = array();
            while ($fila = mysqli_fetch_assoc($resultado)) {
                $usuarios[] = $fila;
            }
            echo json_encode($usuarios);
        }
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
                        $lastEmpleado = mysqli_fetch_assoc($result);

                        // Devolver los detalles del último amigo como JSON
                        echo json_encode($lastEmpleado);
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

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'];
        print_r($_POST);
        $nombre = ucwords($data['nombre']);
        $email = trim($data['email']);
        $telefono = trim($data['telefono']);

        $query = "UPDATE $tbl_alumnos SET nombre='$nombre', email='$email', telefono='$telefono' WHERE id=$id";
        if (mysqli_query($con, $query)) {
            echo json_encode(array('message' => 'Contacto actualizado correctamente'));
        } else {
            echo json_encode(array('error' => 'Error al actualizar contacto: ' . mysqli_error($con)));
        }
        break;

    case 'DELETE':
        $id = $_GET['id'];

        // Obtener el nombre del archivo de imagen asociado al contacto
        $query = "SELECT avatar FROM $tbl_empleados WHERE id=$id";
        $result = mysqli_query($con, $query);
        $row = mysqli_fetch_assoc($result);
        $avatarName = $row['avatar'];

        // Eliminar la entrada del contacto de la base de datos
        $deleteQuery = "DELETE FROM $tbl_empleados WHERE id=$id";
        if (mysqli_query($con, $deleteQuery)) {
            // Eliminar el archivo de imagen si existe
            if ($avatarName) {
                $filePath = $dirLocal . '/' . $avatarName;
                if (file_exists($filePath)) {
                    unlink($filePath); // Eliminar el archivo de imagen
                }
            }
            echo json_encode(array('message' => 'Empleado eliminado correctamente'));
        } else {
            echo json_encode(array('error' => 'Error al eliminar el empleado: ' . mysqli_error($con)));
        }
        break;
}
mysqli_close($con);
