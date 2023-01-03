window.onload = function(){
    validateForm();
}

$("#sesion").on('click', function(e){
    e.preventDefault();
    $("#formLogin").submit();
});

function validateForm() {
    $("#formLogin").validate({
        rules: {
            'user':{
                required: true
            },
            'pwd': {
                required: true
            }
        },
        messages: {
            'user':{
                required: "Campo requerido"
            },
            'pwd': {
                required: "Campo requerido"
            }
        },
        submitHandler: function (form) {
            var data = $(form).serialize();
            console.log(data);
            valDatos(data);
        }
    });
}

function valDatos(data){
    $.ajax({
        type: 'POST',
        url: '?c=administrador&m=access',        
        data: data,
        success: function(response){
            console.log(response);
            if(response){
                window.location.href = "inicio.php";
                // console.log("okay");
            }else{
                M.toast({html: 'USUARIO O CONTRASEÑA INCORRECTO!!'});
            }
        }, error: function(err) {
            console.log(err);

        }
    });
}




