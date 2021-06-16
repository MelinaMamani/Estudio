namespace general{

    window.addEventListener("load", function () {
        document.getElementById("btnGuardar")?.addEventListener("click",guardar);
        document.getElementById("search")?.addEventListener("keyup",filter);
    
        document.getElementById("checkId")?.addEventListener("change",camposMostrar);
        document.getElementById("checkNombre")?.addEventListener("change",camposMostrar);
        document.getElementById("checkApellido")?.addEventListener("change",camposMostrar);
        document.getElementById("checkEdad")?.addEventListener("change",camposMostrar);
    
        document.getElementById("filtro-vehiculos")?.addEventListener("change",filter);
    })

    export var listaPersonas:Array<Persona> = new Array<Persona>();

    export function camposMostrar() {
        if((<HTMLInputElement>document.getElementById("checkId")).checked){
            
        }
        document.getElementById("checkMarca")?.addEventListener("change",camposMostrar);
        document.getElementById("checkModelo")?.addEventListener("change",camposMostrar);
        document.getElementById("checkPrecio")?.addEventListener("change",camposMostrar);
    }

    export function guardar() {
        var inputNombre = (<HTMLInputElement>document.getElementById("nombre")).value;
        var nombreMayus = inputNombre.charAt(0).toUpperCase() + inputNombre.slice(1);

        var inputApellido = (<HTMLInputElement>document.getElementById("apellido")).value;
        var apellidoMayus = inputApellido.charAt(0).toUpperCase() + inputApellido.slice(1);

        var inputEdad : number = parseInt((<HTMLInputElement>document.getElementById("edad")).value);
        var inputSexo = (<HTMLInputElement>document.getElementById("sexo")).value;
        var id :number;

        if (listaPersonas.length == 0) {
            id = 1;
        }
        else {
            var listaPersonasAux = listaPersonas;
            id = listaPersonasAux.reduce(function (maximo, persona) {
                if (persona.getId() >= maximo) {
                    return persona.getId() + 1;
                }
                return maximo;
            }, 0);
        }
        console.log(id,nombreMayus,apellidoMayus,inputEdad,inputSexo);

        if(inputSexo == "Femenino")
         {
            guardarCliente(id,nombreMayus,apellidoMayus,inputEdad, eSexo.Femenino);
        }
         else if(inputSexo == "Masculino")
         {
            guardarCliente(id,nombreMayus,apellidoMayus,inputEdad, eSexo.Masculino);
         } 
    }

    export function guardarCliente(id:number,nombre:string,apellido:string,edad:number,sexo:eSexo) {
        var nuevoCliente:Cliente = new Cliente(id,nombre,apellido,edad,sexo);
        listaPersonas.push(nuevoCliente);
        crearTabla(listaPersonas);
    }

    export function crearTabla(lista:Array<Persona>){
        var tCuerpo = (<HTMLTableElement>document.getElementById("tCuerpo"));

        while(tCuerpo.rows.length > 0){
            tCuerpo.removeChild(tCuerpo.childNodes[0]);
        }
        
        lista.forEach(persona => {
            var id : any = persona.getId();
            var nombre : string = persona.getNombre();
            var apellido : string = persona.getApellido();
            var edad : any = persona.getEdad(); 
            var sexo: any = persona.getSexo();

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

            (<HTMLElement>tCuerpo).appendChild(tr);
        })
    }

    export function filter() {
        var listaFiltrada = listaPersonas.filter(function (persona) {
            return persona instanceof Cliente;
            
             
        });
        crearTabla(listaFiltrada);
    }

    function clickGrilla(event)
    {
        var trClick=event.target.parentNode;
        (<HTMLInputElement>document.getElementById("id")).value=trClick.childNodes[0].innerHTML;
        console.log(trClick.childNodes[0].innerHTML);
        (<HTMLInputElement>document.getElementById("nombre")).value=trClick.childNodes[1].innerHTML;
        (<HTMLInputElement>document.getElementById("apellido")).value=trClick.childNodes[2].innerHTML;
        (<HTMLInputElement>document.getElementById("edad")).value=trClick.childNodes[3].innerHTML;
        (<HTMLInputElement>document.getElementById("sexo")).value=trClick.childNodes[4].innerHTML;

        document.getElementById("btnEliminar").onclick = function eliminar() {

            console.log(trClick.childNodes[0].innerHTML);
            listaPersonas.splice(trClick.childNodes[0].innerHTML,1);
            crearTabla(listaPersonas);
    
        };
    }
}