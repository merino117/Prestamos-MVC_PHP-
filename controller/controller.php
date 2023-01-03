<?php

class administradorController{
    // public $datos;

    public function __construct(){
        require_once 'model/model.php';      
        @session_start();
    }
     
    // MOSTRAR
    function index(){			
        require_once('view/template/index.php');
	}

    function login(){			
        require_once('view/template/login.php');
	}

    function graficas(){		
        require_once('view/template/grafic.php');
	}

    function sesion(){			
        require_once('logout.php');
	}

    function access(){
        $user = $_POST['user'];
        $pwd = $_POST['pwd'];

        $datos =  new Service;
        $resultado = $datos->get_access($user,$pwd);   

        if($resultado){
            echo "1";
        }else{
            echo "0";
        }       
    }

    function getDatos(){
        $datos =  new Service;
        $resultado = $datos->get_datos_tabla();
        echo json_encode($resultado);
    }

    function getUserSelect(){
        $datos =  new Service;
        $resultado = $datos->get_datos_select();
        return $resultado;
    }

    function registeruser(){   
        $user = $_POST['user'];
        $fecha = $_POST['fecha'];
        $cant = $_POST['cant'];

        $datos =  new Service;
        $resultado = $datos->set_register_user($user,$fecha,$cant);

        echo "1";

    }

    function getuser(){
        $id = $_POST['idUSer'];

        $datos = new Service;
        $resultado = $datos->set_user($id);

        echo json_encode($resultado);
    }

    function deleteuser(){
        $id = $_POST['iduser'];

        $datos = new Service;
        $resultado = $datos->set_delete_user($id);

        echo "1";
    }

    function updateUser(){
        $id = $_POST['id'];
        $fecha = $_POST['fecha'];
        $interes = $_POST['interes'];
        $total = $_POST['total'];

        $datos = new Service;
        $resultado = $datos->set_update_user($id,$fecha,$interes,$total);

        echo "1";
    }

    // GRAFICAS

    function getGraficas(){
        $datos =  new Service;
        $resultado = $datos->getGraficas();
        echo json_encode($resultado);
    }

}