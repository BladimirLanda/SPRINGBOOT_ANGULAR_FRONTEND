//MODEL PRODUCT

/*
! Definite Assignment Assertion.
TypeScript tiene strictPropertyInitialization habilitado (que Angular usa por defecto), 
y exige que todas las propiedades de una clase sean inicializadas en el constructor 
o en su declaración.
Entonces ! le dice a TS que se inicializará antes de usarlo, aunque TypeScript no lo vea en ese
*/
export class Product {
    //Atributos
    id!: number;
    name!: string;
    description!: string;
    price!: number;
}