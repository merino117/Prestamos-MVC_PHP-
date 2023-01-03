<?php 
	require_once ('controller/controller.php');
    $controller = new administradorController();
?>

<?php include 'header.php';?>
<?php include 'tabs.php';?>
<div class="spinner"><div id="loader"></div></div>
<body>
    <div class="contenedor2">
		<main>
            <div class="row" style="width: 90%; max-width: 1000px; margin: auto;">
                <div class="card">
                    <div id="divForm" class="card-content">
                        <h4>REGISTRO-PRESTAMOS</h4>            
                        <form id="formReg" class="">

                            <div class="row">
                                <div class="input-field col s4">                                    
                                    <select id="user" name="user">
                                        <option disabled selected>Selecciona nombre</option>
                                        <?php
                                            $catalogo = $controller->getUserSelect();                                           
                                            foreach ($catalogo as $value) {
                                                echo "<option value='".$value['idUser']."'>".$value['nombre']."</option>";                                                
                                            }
                                        ?> 
                                    </select>
                                    <label>Usuario</label>
                                </div>                                                          

                                <div class="input-field col s4"> 
                                    <input  id="fecha" name="fecha" type="text" class="validate" class="datepicker">
                                    <label for="">Fecha</label>
                                </div>
                                <div class="input-field col s4">
                                    <input  id="cant" name="cant" type="text" class="validate" autocomplete="off">                                    
                                     <label for="">Cantidad</label>
                                </div>  
                            </div>                            
                            <!-- ICA120302UV7 165144 -->
                            <a id="btn" type="button" class="waves-effect waves-light btn">agregar</a>
                        </form>
                    </div>
                </div>

                <div class="card">
                    <div class="card-content">
                        <!-- <h4>Registro usuarios</h4> -->
                        <!-- <a id="btnVer" type="button" class="waves-effect waves-light btn" style="float: right; margin-top: -60px;">agregar</a> -->
                        <table  class="cell-border compact stripe" id="reg">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <!-- <th></th> -->
                                    <th>NOMBRE</th>
                                    <th>FECHA INICIO</th>
                                    <th>CANTIDAD</th>
                                    <th>ESTADO</th>    
                                    <th>FECHA FIN</th>
                                    <th>INTERES</th>
                                    <th>TOTAL</th>                              
                                </tr>
                            </thead>
                            <tbody>                                            
                            </tbody>
                        </table>                   
                        
                    </div>
                </div>

                <!-- Modal Structure -->
                <div id="modal1" class="modal modals" style="width: 30%;     height: 50%;">
                    <div class="modal-content">
                        <h4>Actualizar Registro</h4>
                        <form id="formUp" class="">
                            <div class="row">
                                <div class="input-field col s4">                                    
                                    <input style="color: black;" id="nameM" name="name" type="text" class="error" disabled>                                    
                                </div>
                                <div class="input-field col s4">
                                    <input style="color: black;" id="fIM" name="ptr" type="text" disabled>
                                </div>
                                <div class="input-field col s4">
                                    <input style="color: black;" id="cantM" name="mtr" type="text" disabled>
                                </div>
                            </div>

                            <div class="row">                                
                                <div class="input-field col s4">
                                    <input style="color: black;" id="stsM" type="text" disabled>                                    
                                </div>
                                <div class="input-field col s4">
                                    <input placeholder="FECHA FIN" id="fFM" name="fFM" type="text" class="obt datepicker">
                                </div>
                                <div class="input-field col s4">
                                    <input placeholder="INTERES" id="int" name="int" type="text" class="">
                                </div>
                                <!-- <div class="input-field col s4">
                                    <input placeholder="TOTAL" id="totalM" name="totalM" type="text">
                                </div> -->
                            </div> 
                            
                            <div class="row">                                                                                            
                                <div class="input-field col s3">
                                    <input style="color: black;"  placeholder="Dias" id="dia" type="text" class="" disabled>
                                </div>
                                <div class="input-field col s3">
                                    <input placeholder="TOTAL" id="totalM" name="totalM" type="text">
                                </div>
                            </div> 
                        </form>
                    </div>
                    <div class="modal-footer">
                        <a id="btnSave" type="button" class="waves-effect waves-light btn">Guardar</a>
                        <a id="btnClose" type="button" class="waves-effect waves-light btn">Cerrar</a>
                    </div>
                </div>
                <!-- END MODAL  -->

            <div>
		</main>
	</div>
    
    <script src="assets/js/jquery-3.5.1.min.js"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"></script> -->
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script> -->
    <!-- <script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
      <script type="text/javascript" src="js/materialize.min.js"></script> -->
    <script src="assets/js/addRegistro.js"></script>
    <script src="assets/js/datatables.js"></script>
    <script src="assets/js/jquery.validate.js"></script>
    <script>

       $(function(){
            $('select').formSelect();
            $('#fecha').datepicker({
                format: 'dd/mm/yyyy'
            });

            $('#fFM').datepicker({
                format: 'dd/mm/yyyy'
            });
       });
        
    </script>

   
</body>