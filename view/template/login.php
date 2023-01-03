<?php 
	require_once "controller/controller.php";
    $controller = new administradorController();
?>

<?php include 'header.php';?>
<body>
    <div class="contenedor">
        <h4 class="titulo">INICIAR SESIÓN</h4>

        <form id="formLogin" class="formulario">
            <div class="input-field col s6">
                <i class="material-icons prefix">account_circle</i>
                <input id="user" name="user" type="text" class="validate" autocomplete="off">
                <label for="">USUARIO</label>
            </div>
            <!-- <br> -->
            <br>
            <div class="input-field col s6">
                <i class="material-icons prefix">lock</i>
                <input id="pwd" name="pwd" type="password" class="validate">
                <label for="">CONTRASEÑA</label>
            </div>
            <br>
           
            <button id="sesion" type="button" class="waves-effect waves-light btn"> <i class="material-icons prefix">arrow_forward</i></button>
        </form>
    
	</div>
    
    <script src="assets/js/jquery-3.5.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script src="assets/js/login.js"></script>
    <script src="assets/js/jquery.validate.js"></script>

</body>