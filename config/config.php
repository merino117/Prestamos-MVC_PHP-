<?php

class db {


	public function conexion(){
		/* conexion mySQLI */
		$conexion = new mysqli('localhost','root','','prestamos');
		if($conexion->connect_errno){
			printf("Fallo en la conexion: %s\n", $conexion->connect_error);
			exit();
		}
		return $conexion;

	} 
}

?>