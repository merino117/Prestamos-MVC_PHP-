var table,ruta;

function show_loader_wrapper() {
    document.getElementsByClassName("spinner")[0].style.display = "block";
    document.getElementById("loader").style.display = "block";
}

function hide_loader_wrapper() {
    document.getElementsByClassName("spinner")[0].style.display = "none";
    document.getElementById("loader").style.display = "none";
}

window.onload = function(){      
    validateForm();
    consultaTabla();     
    valFormUp();
    
    ruta = window.location.origin+"/proyecto_curso/php_mvc/ejemplo_mvc_3";
    table = $('#reg').DataTable({
        "processing": true,
        "pageLength": 10,
        "responsive": true,
        "paging": true,
        "dom": 'Bfrtip',        
        "buttons": [ {
            "extend": 'excelHtml5',
            "autoFilter": true,
            "sheetName": 'Exported data'
        } ],
        "createdRow": function( row, data, dataIndex ) {
            if ( data[4] == "PENDIENTE" ) {        
                $(row).addClass('blue');
            }else if(data[4] == "PAGADO"){                
                $(row).addClass('green');
            }
        },
        // "columnDefs": [
        //     {
        //         "targets": [ 0 ],
        //         "visible": false,
        //         "searchable": false
        //     }
        // ],
        "select": true,
        "oLanguage": {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sSearchPlaceholder": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        },
        // "order": [[ 2, "decs" ]],
        "fnInitComplete": function (oSettings, json) {
            $('.dataTables_filter input').attr("placeholder", " Busqueda");
        }
    });
    // hide_loader_wrapper(); 
    
}

$("#btn").on('click', function(e){
    e.preventDefault();
    $("#formReg").submit();
});


function validateForm() {
    $("#formReg").validate({
        rules: {
            'user':{
                required: true
            },
            'fecha': {
                required: true
            },
            'cant': {
                required: true
            },
        },
        messages: {
            'user':{
                required: "Campo requerido"
            },
            'fecha': {
                required: "Campo requerido"
            },
            'cant': {
                required: "Campo requerido"
            },
        },
        submitHandler: function (form) {
            var data = $(form).serialize();
            var user = document.getElementById("user").value;
            var fecha = document.getElementById("fecha").value;
            var cant = document.getElementById("cant").value;
            var datos = "user=" + user + "&" + "fecha=" + fecha + "&" + "cant=" + cant;
            insertDatos(datos);
            show_loader_wrapper();
        }
    });
}

function insertDatos(datos){

    var parametros = datos;

    console.log(parametros);
    $.ajax({
        type: 'POST',
        url: '?c=administrador&m=registeruser',        
        dataType: 'json',
        data: parametros,
        success: function(response){
            if(response == 1){
                M.toast({html: 'El registro se agrego correctamente!!'});
                consultaTabla();
                document.getElementById('formReg').reset();
                
                hide_loader_wrapper();
            }else{
                hide_loader_wrapper();
            }
        }, error: function(err) {
            console.log(err);
            hide_loader_wrapper();
        }
    });
}

function consultaTabla(){
    $.ajax({
        url: "?c=administrador&m=getDatos",
        type: "POST",
        success: function(response){
            var rows = table.rows().remove().draw();
            var dt = JSON.parse(response);
            $.each(dt, function(i, v){            
                var idReg = parseInt(v.idReg);
                var nom = v.nombre;
                var nombre = nom.toUpperCase();
                var fechaCap = v.fechaCap;
                var cantidad = "$"+v.cantidad;
                var sts = v.status;

                var val,icon,icons,total,interes;

                if(sts == "A"){
                    val = "PENDIENTE";
                }else{
                    val = "PAGADO";
                }

                if(sts == "B" || sts == ""){
                    icon = "";                        
                    icons = "";      
                }else{
                    icon = '<a idReg="' + idReg + '" class="obtener" style="cursor:pointer;" title="editar"><i class="material-icons">edit</i></a>';
                    // icons = '<a idusr="' + idReg + '" class="borrar" style="cursor:pointer;" title="borrar"><i class="material-icons">delete</i></a>';
                }
                var fechaFin = v.fechaFin;
                var ints = v.interes;
                if(ints == ""){
                    interes = "";
                }else{
                    interes = "$"+v.interes;
                }

                var tl = v.total;
                if(tl == ""){
                    total = "";
                }else{
                    total = "$"+v.total;
                }
                
                table.row.add([
                    icon,
                    // icons,
                    nombre,                    
                    fechaCap,                
                    cantidad,
                    val,
                    fechaFin,
                    interes,
                    total                                        
                ]).draw().node();
                hide_loader_wrapper(); 
            })
        }
    });
}

var id;
$(document).on('click', '.obtener', function(){
    id = $(this).attr("idReg");
    document.getElementById("modal1").style.display = "block";
    updateDatos(id);
    show_loader_wrapper();
});

function updateDatos(id){

    var parametros = {'idUSer': id};
    $.ajax({
        url: "?c=administrador&m=getuser",
        type: "POST",
        data: parametros,
        success: function(response){
            var dts = JSON.parse(response); 

            var nombre = dts.nombre;
            var fechaCap = dts.fechaCap;
            var cantidad = dts.cantidad;
            var status = dts.status;
            var text; 
            if(status == "A"){
                text = "pendiente";
            }else{
                text = "";
            }
            document.getElementById("nameM").value = nombre;
            document.getElementById("fIM").value = fechaCap;
            document.getElementById("cantM").value = cantidad;
            document.getElementById("stsM").value = text;
            hide_loader_wrapper();
        }
    });
}

var btnClose = document.getElementById("btnClose");
btnClose.addEventListener('click', function(){
    document.getElementById('formUp').reset();
    document.getElementById("modal1").style.display = "none";
});

$("#btnSave").on('click', function(e){
    e.preventDefault();
    $("#formUp").submit();
});

function valFormUp() {
    $("#formUp").validate({
        rules: {
            'fFM':{
                required: true
            },
            'int': {
                required: true
            },
            'totalM': {
                required: true
            },            
        },
        messages: {
            'fFM':{
                required: "Campo requerido"
            },
            'int': {
                required: "Campo requerido"
            },
            'totalM': {
                required: "Campo requerido"
            },
        },
        submitHandler: function (form) {
            var dat = $(form).serialize();
            var fch = document.getElementById("fFM").value;
            var int = document.getElementById("int").value;
            var tot = document.getElementById("totalM").value;
            var dt = "id=" + id + "&" + "fecha=" + fch + "&" + "interes=" + int + "&" + "total=" + tot;
            updateDato(dt);
            show_loader_wrapper();
        }
    });
}

function updateDato(dt){
    $.ajax({
        url: "?c=administrador&m=updateUser",        
        type: "POST",
        data: dt,
        success: function(response){
            var val = parseInt(response);
            if(val == 1){
                M.toast({html: 'El registro se actualizo correctamente!!'});
                document.getElementById('formUp').reset();
                document.getElementById("modal1").style.display = "none";
                consultaTabla();
                hide_loader_wrapper();

            }else{
                hide_loader_wrapper();
            }

        }, error: function(err) {
            console.log(err);
            hide_loader_wrapper();
        }
    });
}

$(document).on('click', '.borrar', function(){
    var idDelete = $(this).attr("idusr");
    deleteDato(idDelete);
    show_loader_wrapper();
});

function deleteDato(idDelete){
    var id = parseInt(idDelete);
    var parametro = {'iduser':idDelete};
    $.ajax({
        url: "?c=administrador&m=deleteuser",
        type: "POST",
        data: parametro,
        success: function(response){
            var val = parseInt(response);
            if(val == 1){
                consultaTabla();
                hide_loader_wrapper();
            }else{
                hide_loader_wrapper();
            }

        }, error: function(err) {
            console.log(err);
            hide_loader_wrapper();
        }
    });
}

$(document).on("change", ".obt", function (){
	var tipo = this.value;
	if(tipo){
        var f = document.getElementById("fIM").value;
        var t = tipo;
        var aFecha1 = f.split('/');
        var aFecha2 = t.split('/');
        var fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]);
        var fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]);
        var dif = fFecha2 - fFecha1;
        var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
        var suma = dias + 1;
        document.getElementById("dia").value = "Dias: "+suma;

        var cantPres = document.getElementById("cantM").value;
        var cantInt  = cantPres * 0.02;
        // var decimal = Math.round(m);
        // var decimal = m.toFixed(2);
        var totalInteres = cantInt * suma;
        var tlIns = totalInteres.toFixed(2);
        document.getElementById("int").value = tlIns;
        var sumatotal = parseInt(cantPres)  + totalInteres;  
        document.getElementById("totalM").value = sumatotal;
	}
});



// SELECT cve_rte,cve_dst ,c2 FROM talones WHERE SERIE = 'LN' AND FOLIO = 288116
// SELECT cve_rte,cve_dst ,c2 FROM talones WHERE SERIE = 'OP' AND FOLIO = 13148

// SELECT * FROM TALONES WHERE SERIE = 'OP' AND FOLIO =13148

// SELECT * FROM rtes_div WHERE SERIE = 'LN' AND FOLIO = 289282

// SELECT * FROM CLIENTES WHERE CVE_CTE = 110688

// SELECT * FROM DSTS_DIV WHERE SERIE = 'LN' AND FOLIO =289282

// SELECT * FROM DET_TAL WHERE SERIE = 'LN' AND FOLIO = 289030

// SELECT * FROM ORIGEN_DIV WHERE SERIE = 'LN' AND FOLIO = 289282
// SELECT * FROM DESTINO_DIV WHERE SERIE = 'LN' AND FOLIO = 289282

// Select c.cve_con, c.descri as Consumible, c.tipo, c.minimo, c.maximo,  (SELECT EXISTENCIAS  FROM  KARDEX K  WHERE  K.CVE_CIA=C.CVE_CIA AND K.CVE_ALM=C.CVE_ALM AND K.CVE_CON=C.CVE_CON AND K.NUM_MOVIM  =( SELECT MAX(NUM_MOVIM)  FROM KARDEX  WHERE CVE_CIA=1 AND CVE_ALM=C.CVE_ALM AND CVE_CON=C.CVE_CON )      ),  c.exis, c.cve_umed,c.cve_gpo, c.num_part,  c.ult_precio, c.estante, c.seccion, '___________' as Raya, '' as Nada,  case when c.exis<c.minimo then 1 else 0 end difer  ,c.exis*c.costo total,c.costo cost_prom,       (c.COSTO+(c.COSTO*(0.17))) prev_vent ,  (c.costo+(c.costo*(0.16))) preCIva  , (c.costo+((c.costo+(c.costo*(0.17))) *0.16)) prevCiva,     (c.COSTO+(c.COSTO*(0.17))) *1.16 prev_civa  ,substr(c.seccion_2,1,2) estan,c.cve_alm ,c.ubica,C.MAXIMO-EXIS A_SURTIR , C.INV_FIS  ,  C.INV_FIS2,C.INV_FIS3,C.INV_FIS4,c.fec_inv3, c.fec_inv4, case when c.fec_inv2 is not null then C.EXIS-C.INV_FIS2 else 0 end  DIF1,  c.por_des,c.fec_inv2,c.n_pos posicion,c.unico , c.ult_precio*(C.MAXIMO-c.EXIS)  imp_req , c1.descr motivo ,  (case when c.fec_inv2 is not null then C.EXIS-C.INV_FIS2 else 0 end )  *c.ult_precio costo1   ,   cv.cve_pro , p.raz_soc,c.seccion_2  , case when c.fec_inv3 is not null then C.EXIS-C.INV_FIS3 else 0 end  DIF2,  (case when c.fec_inv3 is not null then C.EXIS-C.INV_FIS3 else 0 end )  *c.ult_precio costo2  ,  c.exis - (SELECT EXISTENCIAS  FROM  KARDEX K  WHERE  K.CVE_CIA=C.CVE_CIA AND K.CVE_ALM=C.CVE_ALM AND K.CVE_CON=C.CVE_CON AND K.NUM_MOVIM  =( SELECT MAX(NUM_MOVIM)  FROM KARDEX  WHERE CVE_CIA=1 AND CVE_ALM=C.CVE_ALM AND CVE_CON=C.CVE_CON )      ) dif  ,  (select sum(ped_exis) from detordcon where cve_cia=c.cve_cia   and cve_alm=c.cve_alm and cve_con=c.cve_con and status in('P','V'))  ped_exis,c.exis -   (select sum(ped_exis)   from detordcon where cve_cia=c.cve_cia and cve_alm=c.cve_alm and cve_con=c.cve_con and status in('P','V')) dif_ped_exi    , C.EXIS - C.INV_FIS2 DIF_TOTAL , C.FEC_INV2 INV_FINAL  from consumos c  left join catcat  c1 on c1.tipo=29000 and c1.clave-c1.tipo=c.motivo  left join conprov cv on cv.cve_cia=c.cve_cia and cv.cve_alm=c.cve_alm and cv.cve_con=c.cve_con    left join proveedor p on p.cve_cia=c.cve_cia and p.cve_pro=cv.cve_pro  where  c.cve_cia=1 and c.cve_alm=2 and c.status='A' and c.exis>0 order by  c.cve_con

// SELECT * FROM EMPLEADOS WHERE NOMBRE = 'ADRIAN' AND PATERNO = 'JUAREZ'

// SELECT * FROM EMP_DIA_VAC WHERE CVE_EMP = 3152 
// SELECT * FROM EMP_REG_VAC WHERE CVE_EMP = 4204