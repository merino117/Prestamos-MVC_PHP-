function show_loader_wrapper() {
    document.getElementsByClassName("spinner")[0].style.display = "block";
    document.getElementById("loader").style.display = "block";
}

function hide_loader_wrapper() {
    document.getElementsByClassName("spinner")[0].style.display = "none";
    document.getElementById("loader").style.display = "none";
}

window.onload = function(){    
    hide_loader_wrapper();
}

google.charts.load("visualization", "1", {packages: ["corechart"]});
google.charts.setOnLoadCallback(datos);

function datos() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'USUARIOS');    
    data.addColumn('number', 'Usuarios');
    data.addColumn({type: 'number', role: 'annotation'});

    var options = {
        legend: {position: 'top'},
        // vAxis: {
        //     maxValue: 10
        // },

        annotations: {
            stemColor: 'none',
            alwaysOutside: true,
            textStyle: {
                fontSize: 14,
                color: 'black',
                auraColor: 'none'
            }
        },
        bars: 'vertical',
        height: 300
    };

    var JSON = $.ajax({
        url: '?c=administrador&m=getGraficas',
        dataType: 'json',
        async: false
    }).responseJSON;

    $.each(JSON, function (index, value) {
        var idInc = parseInt(JSON[index].idUser);   
        var total = parseInt(JSON[index].TOTAL);
        var usuario = JSON[index].nombre;
        data.addRows([[usuario,total,total]]);
    });
    var bar = document.getElementById('piechart');
    var chart = new google.visualization.ColumnChart(bar);

    chart.draw(data, options);
}