<?php  
require_once "config/config.php";

class Service {

    public $db;

    public function __construct(){
        $this->db = db::conexion();
       
    }

    public function get_access($user,$pwd){
        $qry = null;
        $qry = $this->db->query('SELECT idLog,user,password FROM acceso_usuario WHERE user = \''.$user.'\' AND password = \''.$pwd.'\'');
        

        if ($dt = $qry->num_rows == 1) {
            $q = $qry->fetch_assoc();
            @session_start();
            $_SESSION['access'] = true;
            $_SESSION['idLog'] = $q['idLog'];
            $_SESSION['user'] = $q['user'];
            $_SESSION['password'] = $q['password'];                    
            $dt = 1;
            return $dt;
        }else{
           $dt = 0;
            return $dt;

        }      
    }

    public function get_datos_tabla(){
        $qry = null;
        $qry = $this->db->query(
            'SELECT p.idReg, p.idUser, p.fechaCap, p.cantidad, p.status, p.fechaFin,p.interes, p.total, u.nombre
             FROM registro_prestamo p
             INNER JOIN registro_usuario u on u.idUser = p.idUser
             WHERE u.status = \'A\' AND p.cve_cia = 1 LIMIT 100');

        while($q = $qry->fetch_assoc()){
            $dt[] = $q;
        }

        return $dt;
    }

    // select
    public function get_datos_select(){
        $qry = null;
        $qry = $this->db->query('SELECT idUser, nombre FROM registro_usuario WHERE status = \'A\'');
        while($q = $qry->fetch_assoc()){
            $dt[] = $q;
        }
        return $dt;
    }

    public function set_register_user($user,$fecha,$cant){    
        $status = 'A';
        $cve_cia = 1;
        $qry = null;
        $qry = $this->db->query('INSERT INTO registro_prestamo (idUser,fecha,fechaCap,cantidad,status,cve_cia) VALUES (\''. $user . '\',CURRENT_TIMESTAMP,\''. $fecha . '\',\''. $cant . '\',\''. $status . '\',\''. $cve_cia . '\')');
        return $qry;
    }

    public function set_user($id){    
        $qry = null;
        $qry = $this->db->query(
            'SELECT p.idUser, p.fechaCap, p.cantidad, p.status, p.fechaFin, p.total, u.nombre 
             FROM registro_prestamo p 
             INNER JOIN registro_usuario u on u.idUser = p.idUser
             WHERE p.idReg = \''.$id.'\'');
        $q = $qry->fetch_assoc();
        return $q;
    }

    public function set_delete_user($id){
        $qry = null;
        $qry = $this->db->query('DELETE FROM registro_prestamo WHERE idReg = \'' .$id. '\' ');
        return $qry;
    }

    public function set_update_user($id,$fecha,$interes,$total){
        $qry = null;
        $qry = $this->db->query('UPDATE registro_prestamo SET fechaFin=\''.$fecha.'\', interes=\''.$interes.'\', total=\''.$total.'\', status = \'B\' WHERE idReg = \'' .$id. '\' ');
        return $qry;
    }
    
    public function getGraficas(){
        $qry = null;
        $qry = $this->db->query(
            'SELECT R.cve_cia, R.idUser, count(R.idUser) as TOTAL, U.nombre
            FROM registro_prestamo R
            INNER JOIN registro_usuario U on U.idUser = R.idUser        
            WHERE u.status = \'A\' AND R.cve_cia = 1 GROUP BY R.idUser');

        while($q = $qry->fetch_assoc()){
            $dt[] = $q;
        }

        return $dt;
    }
}
?>