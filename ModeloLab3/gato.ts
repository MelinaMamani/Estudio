namespace general{
    export class Gato extends Mascota{

    private cantVidas:number=9;

    constructor(nombre:string, cantVidas:number){
        super(nombre);
        this.cantVidas=cantVidas;
    }

     public getCantVidas():number{
        return this.cantVidas;
    }

    public setCantVidas(cantVidas:number):void{
        this.cantVidas=cantVidas;
    }

    }
}