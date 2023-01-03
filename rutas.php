<?php  
require_once "config/config.php";
require_once "controller/controller.php";

$controller = new administradorController();

if($_GET['action'] == 'ini'){
    $controller->index();
}else{
    echo 'Error';
}



?>