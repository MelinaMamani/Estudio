var general;
(function (general) {
    window.addEventListener("load", function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        (_a = document.getElementById("btnGuardar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", guardar);
        (_b = document.getElementById("btnEliminar")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", eliminar);
        (_c = document.getElementById("search")) === null || _c === void 0 ? void 0 : _c.addEventListener("keyup", filter);
        (_d = document.getElementById("checkId")) === null || _d === void 0 ? void 0 : _d.addEventListener("change", camposMostrar);
        (_e = document.getElementById("checkNombre")) === null || _e === void 0 ? void 0 : _e.addEventListener("change", camposMostrar);
        (_f = document.getElementById("checkApellido")) === null || _f === void 0 ? void 0 : _f.addEventListener("change", camposMostrar);
        (_g = document.getElementById("checkEdad")) === null || _g === void 0 ? void 0 : _g.addEventListener("change", camposMostrar);
        (_h = document.getElementById("filtro-vehiculos")) === null || _h === void 0 ? void 0 : _h.addEventListener("change", filter);
    });
    general.listaPersonas = new Array();
    function camposMostrar() {
        var _a, _b, _c;
        if (document.getElementById("checkId").checked) {
        }
        (_a = document.getElementById("checkMarca")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", camposMostrar);
        (_b = document.getElementById("checkModelo")) === null || _b === void 0 ? void 0 : _b.addEventListener("change", camposMostrar);
        (_c = document.getElementById("checkPrecio")) === null || _c === void 0 ? void 0 : _c.addEventListener("change", camposMostrar);
    }
    general.camposMostrar = camposMostrar;
    function guardar() {
        var inputNombre = document.getElementById("nombre").value;
        var nombreMayus = inputNombre.charAt(0).toUpperCase() + inputNombre.slice(1);
        var inputApellido = document.getElementById("apellido").value;
        var apellidoMayus = inputApellido.charAt(0).toUpperCase() + inputApellido.slice(1);
        var inputEdad = parseInt(document.getElementById("edad").value);
        var inputSexo = document.getElementById("sexo").value;
        var id;
        if (general.listaPersonas.length == 0) {
            id = 1;
        }
        else {
            var listaPersonasAux = general.listaPersonas;
            id = listaPersonasAux.reduce(function (maximo, persona) {
                if (persona.getId() >= maximo) {
                    return persona.getId() + 1;
                }
                return maximo;
            }, 0);
        }
        console.log(id, nombreMayus, apellidoMayus, inputEdad, inputSexo);
        if (inputSexo == "Femenino") {
            guardarCliente(id, nombreMayus, apellidoMayus, inputEdad, general.eSexo.Femenino);
        }
        else if (inputSexo == "Masculino") {
            guardarCliente(id, nombreMayus, apellidoMayus, inputEdad, general.eSexo.Masculino);
        }
    }
    general.guardar = guardar;
    function guardarCliente(id, nombre, apellido, edad, sexo) {
        var nuevoCliente = new general.Cliente(id, nombre, apellido, edad, sexo);
        general.listaPersonas.push(nuevoCliente);
        crearTabla(general.listaPersonas);
    }
    general.guardarCliente = guardarCliente;
    function crearTabla(lista) {
        var tCuerpo = document.getElementById("tCuerpo");
        while (tCuerpo.rows.length > 0) {
            tCuerpo.removeChild(tCuerpo.childNodes[0]);
        }
        lista.forEach(function (persona) {
            var id = persona.getId();
            var nombre = persona.getNombre();
            var apellido = persona.getApellido();
            var edad = persona.getEdad();
            var sexo = persona.getSexo();
            var tr = document.createElement("tr");
            var tdId = document.createElement("td");
            var nodoTexto = document.createTextNode(id);
            tdId.appendChild(nodoTexto);
            tr.appendChild(tdId);
            var tdNombre = document.createElement("td");
            var nodoTexto = document.createTextNode(nombre);
            tdNombre.appendChild(nodoTexto);
            tr.appendChild(tdNombre);
            var tdApellido = document.createElement("td");
            var nodoTexto = document.createTextNode(apellido);
            tdApellido.appendChild(nodoTexto);
            tr.appendChild(tdApellido);
            var tdEdad = document.createElement("td");
            var nodoTexto = document.createTextNode(edad);
            tdEdad.appendChild(nodoTexto);
            tr.appendChild(tdEdad);
            var tdSexo = document.createElement("td");
            var nodoTexto = document.createTextNode(sexo);
            tdSexo.appendChild(nodoTexto);
            tr.appendChild(tdSexo);
            tr.addEventListener("dblclick",clickGrilla);
            tCuerpo.appendChild(tr);
        });
    }
    general.crearTabla = crearTabla;
    /*btnEliminar.onclick = function(){
        eliminar(lista.indexOf(persona))
    };*/
    function eliminar(position) {
        general.listaPersonas.splice(position, 1);
        crearTabla(general.listaPersonas);
    }
    general.eliminar = eliminar;
    function filter() {
        var listaFiltrada = general.listaPersonas.filter(function (persona) {
            return persona instanceof Cliente;
        });
        crearTabla(listaFiltrada);
    }
    general.filter = filter;
    function clickGrilla(event) {
        //document.getElementById("guardarGato").hidden=false;
        console.log(event.target);
        var trClick = event.target.parentNode;
        document.getElementById("id").value = trClick.childNodes[0].innerHTML;
        document.getElementById("nombre").value = trClick.childNodes[1].innerHTML;
        document.getElementById("apellido").value = trClick.childNodes[2].innerHTML;
        document.getElementById("edad").value = trClick.childNodes[3].innerHTML;
        document.getElementById("sexo").value = trClick.childNodes[4].innerHTML;
    }
})(general || (general = {}));
