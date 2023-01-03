<?php  
require_once "config/config.php";
require_once "controller/controller.php";

if(!isset($_REQUEST['c'])){
	$controller = new administradorController();
	$controller->login();
}else{
	$controller = new administradorController();
	$controller->access();
}