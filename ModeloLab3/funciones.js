var general;
(function (general) {
    window.addEventListener("load", function () {
        document.getElementById("cerrarGato").addEventListener("click", cerrarGato);
        document.getElementById("cerrarPerro").addEventListener("click", cerrarPerro);
        document.getElementById("cerrarPajaro").addEventListener("click", cerrarPajaro);
        document.getElementById("tipoMascota").addEventListener("click", elegir);
        document.getElementById("guardarGato").addEventListener("click", guardarGato);
        document.getElementById("guardarPerro").addEventListener("click", guardarPerro);
        document.getElementById("guardarPajaro").addEventListener("click", guardarPajaro);
        // document.getElementById("eliminar").addEventListener("click",eliminarGato())
    });
    var listaMascotas = new Array();
    function elegir() {
        var mascota = document.getElementById("tipoMascota").value;
        //  var elementoGato = <HTMLInputElement>document.getElementById("agregarGato");
        //  var elementoPerro = <HTMLInputElement>document.getElementById("agregarPerro");
        // var elementoPajaro = <HTMLInputElement>document.getElementById("agregarPajaro");
        //   var mascota:string = elementoMascota.value;
        if (mascota === "gato") {
            document.getElementById("agregarPerro").hidden = true;
            document.getElementById("tablaPerro").hidden = true;
            document.getElementById("agregarPajaro").hidden = true;
            document.getElementById("tablaPajaro").hidden = true;
            document.getElementById("agregarGato").hidden = false;
            document.getElementById("tablaGato").hidden = false;
            document.getElementById("btnGato").addEventListener("click", general.guardarGato);
        }
        else if (mascota === "perro") {
            document.getElementById("agregarGato").hidden = true;
            document.getElementById("tablaGato").hidden = true;
            document.getElementById("agregarPajaro").hidden = true;
            document.getElementById("tablaPajaro").hidden = true;
            document.getElementById("agregarPerro").hidden = false;
            document.getElementById("tablaPerro").hidden = false;
            document.getElementById("btnPerro").addEventListener("click", general.guardarPerro);
        }
        else if (mascota === "pajaro") {
            document.getElementById("agregarGato").hidden = true;
            document.getElementById("tablaGato").hidden = true;
            document.getElementById("agregarPerro").hidden = true;
            document.getElementById("tablaPerro").hidden = true;
            document.getElementById("agregarPajaro").hidden = false;
            document.getElementById("tablaPajaro").hidden = false;
            document.getElementById("btnPajaro").addEventListener("click", general.guardarPajaro);
        }
    }
    general.elegir = elegir;
    function cerrarGato() {
        document.getElementById("agregarGato").hidden = true;
        document.getElementById("tablaGato").hidden = true;
    }
    function cerrarPerro() {
        document.getElementById("agregarPerro").hidden = true;
        document.getElementById("tablaPerro").hidden = true;
    }
    function cerrarPajaro() {
        document.getElementById("agregarPajaro").hidden = true;
        document.getElementById("tablaPajaro").hidden = true;
    }
    function guardarGato() {
        var nombre = document.getElementById("nameCat").value;
        var cantVidas = parseInt(document.getElementById("life").value);
        var miGato = new general.Gato(nombre, cantVidas);
        listaMascotas.push(miGato);
        var cuerpo = document.getElementById("cuerpoGato");
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var nodoTexto1 = document.createTextNode(miGato.getNombre());
        td1.appendChild(nodoTexto1);
        tr.appendChild(td1);
        var td2 = document.createElement("td");
        var nodoTexto2 = document.createTextNode(miGato.getCantVidas().toString());
        td2.appendChild(nodoTexto2);
        tr.appendChild(td2);
        tr.addEventListener("dblclick", clickGrilla);
        cuerpo.appendChild(tr);
    }
    general.guardarGato = guardarGato;
    function clickGrilla(event) {
        document.getElementById("guardarGato").hidden = false;
        console.log(event.target);
        var trClick = event.target.parentNode;
        document.getElementById("nameCat").value = trClick.childNodes[0].innerHTML;
        document.getElementById("life").value = trClick.childNodes[1].innerHTML;
    }
    function Eliminar(i) {
        document.getElementsByTagName("table")[0].setAttribute("id", "tableid");
        document.getElementById("tableid").deleteRow(i);
    }
    function guardarPerro() {
        var nombre = document.getElementById("nameDog").value;
        var raza = document.getElementById("raza").value;
        var miPerro = new general.Perro(nombre, raza);
        listaMascotas.push(miPerro);
        var cuerpo = document.getElementById("cuerpoPerro");
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var nodoTexto1 = document.createTextNode(miPerro.getNombre());
        td1.appendChild(nodoTexto1);
        tr.appendChild(td1);
        var td2 = document.createElement("td");
        var nodoTexto2 = document.createTextNode(miPerro.getRaza());
        td2.appendChild(nodoTexto2);
        tr.appendChild(td2);
        cuerpo.appendChild(tr);
    }
    general.guardarPerro = guardarPerro;
    function guardarPajaro() {
        var nombre = document.getElementById("nameBird").value;
        var pajaro = document.getElementById("typeBird").value;
        // var miPajaro = new Pajaro(nombre,pajaro);
        // var elementoTipo = <HTMLInputElement>document.getElementById("tipo");
        if (pajaro == "Rapinia") {
            var tipo1 = general.ePajaro.Rapinia;
            var miPajaro = new general.Pajaro(nombre, tipo1);
        }
        if (pajaro == "Loro") {
            var tipo2 = general.ePajaro.Loro;
            var miPajaro = new general.Pajaro(nombre, tipo2);
        }
        listaMascotas.push(miPajaro);
        var cuerpo = document.getElementById("cuerpoPajaro");
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var nodoTexto1 = document.createTextNode(miPajaro.getNombre());
        td1.appendChild(nodoTexto1);
        tr.appendChild(td1);
        var td2 = document.createElement("td");
        var nodoTexto2 = document.createTextNode(miPajaro.getTipo().toString());
        td2.appendChild(nodoTexto2);
        tr.appendChild(td2);
        cuerpo.appendChild(tr);
    }
    general.guardarPajaro = guardarPajaro;
    /* export function tecla(){
         alert(document.getElementById("tecla").value);
     } */
})(general || (general = {}));
