namespace general{

    export class Camioneta extends Vehiculo {
        
        private cuatroXcuatro:boolean;
        
        constructor(id:number,marca:string,modelo:string,precio:number,cuatro?:boolean) {
            super(id,marca,modelo,precio);
            this.cuatroXcuatro = cuatro || false;
        }

        public getCuatro():boolean {
            return this.cuatroXcuatro; 
        }
 
         public setCuatro(cuatrox4:boolean):void{
             this.cuatroXcuatro = cuatrox4;
        }
    }
}