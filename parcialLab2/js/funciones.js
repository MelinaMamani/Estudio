var general;
(function (general) {
    window.addEventListener("load", function () {
        document.getElementById("btnAlta").addEventListener("click", abrirFormulario);
        document.getElementById("btnModificar").addEventListener("click", darDeAlta);
        document.getElementById("btnCerrarMod").addEventListener("click", cerrarGrilla);
    });
    function abrirFormulario() {
        var backdrop = document.getElementById("backdrop");
        backdrop.style.display = "flex";
    }
    general.abrirFormulario = abrirFormulario;
    function cerrarGrilla() {
        var backdrop = document.getElementById("backdrop");
        backdrop.style.display = "none";
    }
    general.cerrarGrilla = cerrarGrilla;
    var listaVehiculos = new Array();
    var id = listaVehiculos.reduce(function (item) {
        return item.getId() + 1;
    }, 0);
    function darDeAlta() {
        var backdrop = document.getElementById("backdrop");
        var modal = document.getElementById("container-modificar");
        backdrop.addEventListener("click", cerrarGrilla);
        modal.addEventListener("click", modalClick);
        var vehiculo = document.getElementById("tipoMod").value;
        if (vehiculo === "Auto") {
            var marca = document.getElementById("marcaMod").value;
            var modelo = document.getElementById("modeloMod").value;
            var precio = parseInt(document.getElementById("precioMod").value);
            console.log(id + " " + marca + " " + modelo + " " + precio);
            var miAuto = new Auto(id, marca, modelo, precio);
            console.log(miAuto);
            listaVehiculos.push(miAuto);
            general.guardarAuto(miAuto);
        }
        else if (vehiculo === "Camioneta") {
            var marca = document.getElementById("marcaMod").value;
            var modelo = document.getElementById("modeloMod").value;
            var precio = parseInt(document.getElementById("precioMod").value);
            console.log(id + " " + marca + " " + modelo + " " + precio);
            var miCamioneta = new Camioneta(id, marca, modelo, precio);
            listaVehiculos.push(miCamioneta);
            general.guardarCamioneta(miCamioneta);
        }
    }
    general.darDeAlta = darDeAlta;
    function guardarAuto(miAuto) {
        var cuerpo = document.getElementById("cuerpoAuto");
        var tr = document.createElement("tr");
        var td0 = document.createElement("td");
        var nodoTexto0 = document.createTextNode(id.toString());
        td0.appendChild(nodoTexto0);
        tr.appendChild(td0);
        var td1 = document.createElement("td");
        var nodoTexto1 = document.createTextNode(miAuto.getMarca());
        td1.appendChild(nodoTexto1);
        tr.appendChild(td1);
        var td2 = document.createElement("td");
        var nodoTexto2 = document.createTextNode(miAuto.getModelo());
        td2.appendChild(nodoTexto2);
        tr.appendChild(td2);
        var td3 = document.createElement("td");
        var nodoTexto3 = document.createTextNode(miAuto.getPrecio().toString());
        td3.appendChild(nodoTexto3);
        tr.appendChild(td3);
        tr.addEventListener("dblclick", clickGrilla);
        cuerpo.appendChild(tr);
    }
    general.guardarAuto = guardarAuto;
    function guardarCamioneta(miCamioneta) {
        var cuerpo = document.getElementById("cuerpoCamioneta");
        var tr = document.createElement("tr");
        var td0 = document.createElement("td");
        var nodoTexto0 = document.createTextNode(id.toString());
        td0.appendChild(nodoTexto0);
        tr.appendChild(td0);
        var td1 = document.createElement("td");
        var nodoTexto1 = document.createTextNode(miCamioneta.getMarca());
        td1.appendChild(nodoTexto1);
        tr.appendChild(td1);
        var td2 = document.createElement("td");
        var nodoTexto2 = document.createTextNode(miCamioneta.getModelo());
        td2.appendChild(nodoTexto2);
        tr.appendChild(td2);
        var td3 = document.createElement("td");
        var nodoTexto3 = document.createTextNode(miCamioneta.getPrecio().toString());
        td3.appendChild(nodoTexto3);
        tr.appendChild(td3);
        tr.addEventListener("dblclick", clickGrilla);
        cuerpo.appendChild(tr);
    }
    general.guardarCamioneta = guardarCamioneta;
    function clickGrilla(event) {
        document.getElementById("guardarAuto").hidden = false;
        console.log(event.target);
        var trClick = event.target.parentNode;
    }
    function modalClick(evento) {
        evento.stopPropagation();
    }
    general.modalClick = modalClick;
})(general || (general = {}));
