<?php 
@session_start();
$_SESSION["idLog"] = NULL;
$_SESSION["user"] = NULL;
$_SESSION['access'] = false;
session_destroy();
@header('Location: index.php');
?>