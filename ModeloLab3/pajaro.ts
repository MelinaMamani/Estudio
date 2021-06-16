namespace general{
    export class Pajaro extends Mascota{

    private tipo:ePajaro;
    
    
    constructor(nombre:string, tipo:ePajaro){
        super(nombre);
        this.tipo=tipo;
    }

     public getTipo():ePajaro{
        return this.tipo;
    }

    public setTipo(tipo:ePajaro):void{
        this.tipo=tipo;
    }

    }
}