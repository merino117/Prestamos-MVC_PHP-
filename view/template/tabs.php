<?php 
	require_once ('controller/controller.php');
    $controller = new administradorController();
?>

<nav>
    <div class="nav-wrapper blue lighten-3">
        <a href="#" class="brand-logo">Logo</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="inicio.php">INICIO</a></li>
        <li><a href="inicio.php?c=administrador&m=graficas">GRAFICAS</a></li>
        <li><a href="#">USUARIOS</a></li>
        <li><a href="logout.php">CERRAR SESION</a></li>
        <!-- <li><a href="rutas.php?action=ini">INICIOssss</a></li> -->
        </ul>
    </div>
</nav>