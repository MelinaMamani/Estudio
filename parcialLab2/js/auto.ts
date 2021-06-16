namespace general{

    export class Auto extends Vehiculo{

        private cantDePuertas:number;

        constructor(id:number,marca:string,modelo:string,precio:number,cantPuertas?:number){
            super(id,marca,modelo,precio);
            this.cantDePuertas = cantPuertas || 4;
        }

        public getCantPuertas():number {
            return this.cantDePuertas; 
        }
 
         public setCantPuertas(cant:number):void{
             this.cantDePuertas = cant;
        }
    }
}