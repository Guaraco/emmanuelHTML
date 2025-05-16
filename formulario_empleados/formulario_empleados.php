<?php
// Configuración de conexión
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "empresa_db";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);
// Revisar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Variables iniciales
$mensaje = "";
$id = $nombre = $puesto = $email = $telefono = "";

// Procesar formulario según acción
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener datos del formulario
    $id = isset($_POST["id"]) ? intval($_POST["id"]) : 0;
    $nombre = trim($_POST["nombre"]);
    $puesto = trim($_POST["puesto"]);
    $email = trim($_POST["email"]);
    $telefono = trim($_POST["telefono"]);

    if (isset($_POST["insertar"])) {
        if ($nombre == "" || $puesto == "") {
            $mensaje = "Nombre y puesto son obligatorios.";
        } else {
            $stmt = $conn->prepare("INSERT INTO empleados (nombre, puesto, email, telefono) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", $nombre, $puesto, $email, $telefono);
            if ($stmt->execute()) {
                $mensaje = "Empleado insertado correctamente.";
            } else {
                $mensaje = "Error al insertar: " . $conn->error;
            }
            $stmt->close();
        }
    } elseif (isset($_POST["modificar"])) {
        if ($id <= 0) {
            $mensaje = "Seleccione un empleado válido para modificar.";
        } elseif ($nombre == "" || $puesto == "") {
            $mensaje = "Nombre y puesto son obligatorios.";
        } else {
            $stmt = $conn->prepare("UPDATE empleados SET nombre=?, puesto=?, email=?, telefono=? WHERE id=?");
            $stmt->bind_param("ssssi", $nombre, $puesto, $email, $telefono, $id);
            if ($stmt->execute()) {
                $mensaje = "Empleado modificado correctamente.";
            } else {
                $mensaje = "Error al modificar: " . $conn->error;
            }
            $stmt->close();
        }
    } elseif (isset($_POST["borrar"])) {
        if ($id <= 0) {
            $mensaje = "Seleccione un empleado válido para borrar.";
        } else {
            $stmt = $conn->prepare("DELETE FROM empleados WHERE id=?");
            $stmt->bind_param("i", $id);
            if ($stmt->execute()) {
                $mensaje = "Empleado borrado correctamente.";
                $id = $nombre = $puesto = $email = $telefono = ""; // limpiar campos
            } else {
                $mensaje = "Error al borrar: " . $conn->error;
            }
            $stmt->close();
        }
    } elseif (isset($_POST["buscar"])) {
        if ($id <= 0) {
            $mensaje = "Seleccione un empleado válido para buscar.";
        } else {
            $stmt = $conn->prepare("SELECT nombre, puesto, email, telefono FROM empleados WHERE id=?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $stmt->bind_result($nombre, $puesto, $email, $telefono);
            if ($stmt->fetch()) {
                $mensaje = "Empleado encontrado.";
            } else {
                $mensaje = "Empleado no encontrado.";
                $id = $nombre = $puesto = $email = $telefono = "";
            }
            $stmt->close();
        }
    }
}

// Obtener todos los empleados para mostrar en la lista desplegable
$result = $conn->query("SELECT id, nombre FROM empleados ORDER BY nombre ASC");
$empleados = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $empleados[] = $row;
    }
}
$conn->close();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <title>Formulario de Empleados</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f4f7f9;
            color: #333;
            margin: 0; padding: 0;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: 100vh;
        }
        .container {
            background: linear-gradient(135deg, #5b5f97, #4caf50);
            padding: 25px 35px;
            margin: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            width: 420px;
            color: #eee;
        }
        h1 {
            text-align: center;
            margin-bottom: 25px;
            color: #d3f8d3;
            text-shadow: 1px 1px 3px #1e2a2a;
        }
        label {
            display: block;
            margin-top: 15px;
            font-weight: bold;
            color: #d3f8d3;
            text-shadow: 0 1px 1px #1e2a2a;
        }
        input[type=text], select {
            width: 100%;
            padding: 10px;
            margin-top: 6px;
            border-radius: 8px;
            border: none;
            box-sizing: border-box;
            font-size: 15px;
            background: #e1e6e8;
            color: #333;
            transition: 0.3s ease;
        }
        input[type=text]:focus, select:focus {
            background: #c5d1f2;
            outline: none;
            box-shadow: 0 0 8px #4caf50;
        }
        .btn-group {
            margin-top: 25px;
            display: flex;
            justify-content: space-between;
        }
        button {
            flex: 1;
            padding: 12px 0;
            margin: 0 5px;
            background-color: #d3f8d3;
            border: none;
            border-radius: 10px;
            font-weight: bold;
            color: #3a5a40;
            cursor: pointer;
            box-shadow: 0 3px 6px #2f4f2f;
            transition: background-color 0.3s ease;
        }
        button:hover {
            background-color: #70a35d;
            color: #e6f4e6;
        }
        .mensaje {
            margin-top: 20px;
            background-color: #a1c99a;
            padding: 12px;
            border-radius: 8px;
            text-align: center;
            color: #1f3e1f;
            font-weight: 600;
            box-shadow: 0 3px 6px #486b35;
        }
        select.empleados-list {
            font-weight: normal;
            color: #333;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Formulario de Empleados</h1>

        <form method="POST" action="">
            <label for="id">Seleccionar empleado (opcional para modificar/borrar/buscar):</label>
            <select name="id" id="id" class="empleados-list" onchange="this.form.submit()">
                <option value="">-- Nuevo Empleado --</option>
                <?php foreach ($empleados as $emp): ?>
                    <option value="<?= $emp['id'] ?>" <?= ($emp['id'] == $id) ? "selected" : "" ?>>
                        <?= htmlspecialchars($emp['nombre']) ?>
                    </option>
                <?php endforeach; ?>
            </select>

            <label for="nombre">Nombre*:</label>
            <input type="text" name="nombre" id="nombre" value="<?= htmlspecialchars($nombre) ?>" required />

            <label for="puesto">Puesto*:</label>
            <input type="text" name="puesto" id="puesto" value="<?= htmlspecialchars($puesto) ?>" required />

            <label for="email">Email:</label>
            <input type="text" name="email" id="email" value="<?= htmlspecialchars($email) ?>" placeholder="Opcional" />

            <label for="telefono">Teléfono:</label>
            <input type="text" name="telefono" id="telefono" value="<?= htmlspecialchars($telefono) ?>" placeholder="Opcional" />

            <div class="btn-group">
                <button type="submit" name="insertar">Insertar</button>
                <button type="submit" name="modificar">Modificar</button>
                <button type="submit" name="borrar" onclick="return confirm('¿Seguro que deseas borrar este empleado?')">Borrar</button>
                <button type="submit" name="buscar">Buscar</button>
            </div>
        </form>

        <?php if ($mensaje): ?>
            <div class="mensaje"><?= htmlspecialchars($mensaje) ?></div>
        <?php endif; ?>
    </div>
</body>
</html>
