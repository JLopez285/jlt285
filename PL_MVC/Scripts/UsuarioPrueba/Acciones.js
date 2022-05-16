////const { each } = require("jquery");
////$(document).ready(function () {

////});

////$("#btnCargafile").on("click", function () {
////    console.log($("#inputCargafile").val());

////    $.post("api/CargaMasiva", {

////        "Nombre": Juan,
////        "Apellidop": Ramirez

////    }, function (data) {

////    });
////});


////function llenarTabla() {
////    $.post("api/GetALl", {
////    }, function (data) {

////        var lista = data.result.Objects;

////        each(lista, function (i, item) {

////            var dato = `<tr>
////                    <td>${item.Id}</td>
////                    <td>${item.Nombre}</td>
////                    <td>${item.Apellidos}</td>
////                    <td><button class="btn btn-danger" OnClick=Pregunta(${item.Id})>Eliminar</button></td>
////                    </tr>`

////            $("#bodyTable").append(dato);

////        });

////    })

////}

////function Pregunta(id) {
////    var g = alert("Desea eliminar?");

////    if (g) {
////        eliminar(id)
////    }
////}


////function eliminar(id) {
////    $.delete("api/Delete", {
////        "idNombreRegistro": id
////    }, function (data) {

////        if (data.Correct) {
////            alert("Mensaje eliminado correctamente");
////        }

////    });

////}

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
                    + '<a href="#" onclick="GetById(' + usuario.IdUsuario + ')">'
                    + '<img  style="height: 25px; width: 25px;" src="../img/edit.ico" />'
                    + '</a> '
                    + '</td>'
                    + "<td  id='txtIdUsuario' class='text-center'>" + usuario.IdUsuario + "</td>"
                    + "<td class='text-center'>" + usuario.Nombre + "</ td>"
                    + "<td class='text-center'>" + usuario.ApellidoPaterno + "</td>"
                    //+ "<td class='text-center'>" + empleado.Estado.IdEstado + "</td>"
                    //+ "<td class='text-center'>" + empleado.Estado.Nombre + "</td>"
                    //+ '<td class="text-center">  <a href="#" onclick="return Eliminar(' + subCategoria.IdSubCategoria + ')">' + '<img  style="height: 25px; width: 25px;" src="../img/delete.png" />' + '</a>    </td>'
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
    var archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    var contenido = "";
    var lector = new FileReader();
    lector.onload = function (e) {
        contenido = e.target.result;
        ///////////////////////////

        var objetoDatos = contenido.split("\r\n")
        var JsonFinal = { "Usuarios": [] }
        var Usuarios = [];
        var objeto = {};

        $.each(objetoDatos, function (i, item) {

            var objetoSeparado = item.split("-")

            objeto = {

                "Nombre": objetoSeparado[0],
                "ApellidoPaterno": objetoSeparado[1],
            };
            $.post("http://localhost:52227/usuario/Add", objeto
                , function (result) {
                    console.log(result);
                });

        });
        //objeto.Usuarios = Usuarios;
        //var f = JSON.stringify(objeto)
        //const obj = JSON.parse(f)

        //$.post("http://localhost:54551/usuario/Add", obj
        //    , function (result) {
        //        console.log(result);
        //    });

        //$.ajax({
        //    type: 'POST',
        //    url: 'http://localhost:54551/usuario/Add',
        //    dataType: 'json',
        //    data: t,
        //    success: function (result) {
        //        $('#myyModal').modal();
        //    },
        //    error: function (result) {
        //        alert('Error en la consulta.' + result.responseJSON.ErrorMessage);
        //    }
        //});
        ////////////////////////////////////////
    };

    lector.readAsText(archivo);

}

document.getElementById('file-input')
    .addEventListener('change', leerArchivo, false);