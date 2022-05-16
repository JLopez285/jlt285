$(document).ready(function () { //click
    GetAll();
});

function GetAll() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:52227/usuario/GetAll',
        success: function (result) { //200 OK 

            $('#tblUsuarios tbody').empty();

            $.each(result.Objects, function (i, usuario) {
                var filas =
                    '<tr>'
                    + '<td class="text-center"> '
                    + '</a> '
                    + '</td>'
                    + "<td  id='txtIdUsuario' class='text-center'>" + usuario.IdUsuario + "</td>"
                    + "<td class='text-center'>" + usuario.Nombre + "</ td>"
                    + "<td class='text-center'>" + usuario.ApellidoPaterno + "</td>"
                    + '<td class="text-center"> <button class="btn btn-danger" onclick="Eliminar(' + usuario.IdUsuario + ')"><span class="glyphicon glyphicon-trash" style="color:#FFFFFF"></span></button></td>'
                    + "</tr>";
                $("#tblUsuarios tbody").append(filas);
            });

        },
        error: function (result) {
            alert('Error en la consulta.' + result.responseJSON.ErrorMessage);
        }
    });
};
function Eliminar(IdUsuario) {

    if (confirm("¿Estas seguro de eliminar el usuario seleccionado?")) {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:52227/usuario/Delete/' + IdUsuario,
            success: function (result) {

                GetAll();

            },
            error: function (result) {
                alert('Error en la consulta.' + result.responseJSON.ErrorMessage);
            }
        });
    };
};
function leerArchivo(e) {

    if (confirm("¿Estas seguro deagregar un elemento?")) {
        var archivo = e.target.files[0];
        if (!archivo) {
            return;
        }
        var contenido = "";
        var lector = new FileReader();
        lector.onload = function (e) {
            contenido = e.target.result;

            var objetoDatos = contenido.split("\r\n")
            var objeto = {};

            $.each(objetoDatos, function (i, item) {

                var objetoSeparado = item.split("-")

                objeto = {

                    "Nombre": objetoSeparado[0],
                    "ApellidoPaterno": objetoSeparado[1],
                };
                $.post("http://localhost:52227/usuario/Add", objeto
                    , function (result) {
                        GetAll();
                    });
            });
        };

        lector.readAsText(archivo);
    }
}

document.getElementById('file-input')
    .addEventListener('change', leerArchivo, false);