namespace general{

    window.addEventListener("load",function(){
        document.getElementById("btnAlta").addEventListener("click",abrirFormulario);
        document.getElementById("btnModificar").addEventListener("click",darDeAlta);
        document.getElementById("btnCerrarMod").addEventListener("click",cerrarGrilla);
    });
    
    export function abrirFormulario() {
        var backdrop = document.getElementById("backdrop");
        backdrop.style.display = "flex";
    }

    export function cerrarGrilla() {
        var backdrop = document.getElementById("backdrop");
        backdrop.style.display = "none";
    }
    
    var listaVehiculos:Array<Vehiculo> = new Array<Vehiculo>();

    var id = listaVehiculos.reduce(function(item) {
        return item.getId() + 1;
    },0);

    export function darDeAlta() {
        var backdrop = document.getElementById("backdrop");
        var modal = document.getElementById("container-modificar");
        backdrop.addEventListener("click", cerrarGrilla);
        modal.addEventListener("click", modalClick);

        var vehiculo = (<HTMLInputElement>document.getElementById("tipoMod")).value;

        if (vehiculo === "Auto") {
            var marca:string=(<HTMLInputElement>document.getElementById("marcaMod")).value;
            var modelo:string=(<HTMLInputElement>document.getElementById("modeloMod")).value;
            var precio:number =parseInt((<HTMLInputElement>document.getElementById("precioMod")).value);
            
            console.log(id+" "+marca+" "+modelo+" "+precio);

            var miAuto:Auto = new Auto(id,marca,modelo,precio);

            console.log(miAuto);

            listaVehiculos.push(miAuto);
            general.guardarAuto(miAuto);
        } 
        else if (vehiculo === "Camioneta") {

            var marca:string=(<HTMLInputElement>document.getElementById("marcaMod")).value;
            var modelo:string=(<HTMLInputElement>document.getElementById("modeloMod")).value;
            var precio:number =parseInt((<HTMLInputElement>document.getElementById("precioMod")).value);
            
            console.log(id+" "+marca+" "+modelo+" "+precio);

            var miCamioneta:Camioneta = new Camioneta(id,marca,modelo,precio);

            
            listaVehiculos.push(miCamioneta);
            
            general.guardarCamioneta(miCamioneta);
        }

    }

    export function guardarAuto(miAuto) {

        var cuerpo = document.getElementById("cuerpoAuto");

        var tr = document.createElement("tr");

        var td0 = document.createElement("td");
        var nodoTexto0=document.createTextNode(id.toString());
        td0.appendChild(nodoTexto0);
        tr.appendChild(td0);

        var td1 = document.createElement("td");
        var nodoTexto1=document.createTextNode(miAuto.getMarca());
        td1.appendChild(nodoTexto1);
        tr.appendChild(td1);

        var td2 = document.createElement("td");
        var nodoTexto2=document.createTextNode(miAuto.getModelo());
        td2.appendChild(nodoTexto2);
        tr.appendChild(td2);

       
        var td3 = document.createElement("td");
        var nodoTexto3=document.createTextNode(miAuto.getPrecio().toString());
        td3.appendChild(nodoTexto3);
        tr.appendChild(td3);

      
        tr.addEventListener("dblclick",clickGrilla); 

        cuerpo.appendChild(tr);
    }

    export function guardarCamioneta(miCamioneta) {
        var cuerpo = document.getElementById("cuerpoCamioneta");

        var tr = document.createElement("tr");

        var td0 = document.createElement("td");
        var nodoTexto0=document.createTextNode(id.toString());
        td0.appendChild(nodoTexto0);
        tr.appendChild(td0);

        var td1 = document.createElement("td");
        var nodoTexto1=document.createTextNode(miCamioneta.getMarca());
        td1.appendChild(nodoTexto1);
        tr.appendChild(td1);

        var td2 = document.createElement("td");
        var nodoTexto2=document.createTextNode(miCamioneta.getModelo());
        td2.appendChild(nodoTexto2);
        tr.appendChild(td2);

       
        var td3 = document.createElement("td");
        var nodoTexto3=document.createTextNode(miCamioneta.getPrecio().toString());
        td3.appendChild(nodoTexto3);
        tr.appendChild(td3);

      
        tr.addEventListener("dblclick",clickGrilla); 

        cuerpo.appendChild(tr);
    }

    function clickGrilla(event)
    {
    document.getElementById("guardarAuto").hidden=false;
    console.log(event.target);
    var trClick=event.target.parentNode;
    }

    export function modalClick(evento) {
        evento.stopPropagation();
    }


}
