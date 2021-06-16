namespace general{
    export class Perro extends Mascota{

    private raza:string="";

    constructor(nombre:string, raza:string){
        super(nombre);
        this.raza=raza;
    }

     public getRaza():string{
        return this.raza;
    }

    public setRaza(raza:string):void{
        this.raza=raza;
    }

    }
}