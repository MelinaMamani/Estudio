namespace general{

    export class Cliente extends Persona {

        private edad:number;
        private sexo:eSexo;

        constructor(id:number,nombre:string,apellido:string,edad:number, sexo:eSexo) {
            super(id,nombre,apellido);
            this.edad = edad;
            this.sexo = sexo;
        }

        public getEdad() {
            return this.edad;   
        }

        public getSexo() {
            return this.sexo;   
        }
    }
}