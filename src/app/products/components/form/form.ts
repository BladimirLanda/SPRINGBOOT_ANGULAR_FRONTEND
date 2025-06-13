import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

/*
FormsModule
Es un módulo que Angular proporciona para trabajar con formularios basados en
templates (template-driven forms).
Es el módulo que permite usar directivas como:
  -[(ngModel)] para enlazar inputs con variables del componente.
  -(ngSubmit) para manejar el evento de envío de formularios.

(ngSubmit)="onSubmit()"
Es una directiva que escucha el evento submit del formulario, pero de 
forma angular, permitiendo que se ejecute una función en el componente 
cuando se envía el formulario.

[(ngModel)]="product.name"
Es una directiva de Angular para enlazar datos de doble vía (two-way data binding) 
entre una propiedad del componente y un input del formulario.
Lo que escribas en ese input actualizará automáticamente product.name en el componente, 
y si product.name cambia desde el código, también se reflejará en el input.

ngModel
Es una directiva estructural que Angular aplica automáticamente a cualquier <input> 
cuando se usa FormsModule. Sirve para:
-Estás creando una referencia local en el template llamado name, que apunta 
a la instancia del NgModel asociada a ese input.
-El estado de validez del input (validm invalid)
-Acciones de estado (touched, dirty, errors)
Se requiere el atributo required, ya que Angular lo usa para evaluar 
description.valid, description.invalid y description.errors.

ngForm
Es una directiva estructural que Angular aplica automáticamente a cualquier <form> 
cuando se usa FormsModule. Sirve para:
-Gestionar el estado y la validación de los controles del formulario.
-Proporcionar un objeto NgForm asociado al formulario, que contiene:
  -El estado de validez del formulario (valid, invalid, pristine, dirty, 
  touched, untouched).
  -Métodos para resetear y controlar el formulario (resetForm(), controls, etc.)
  -Acceso a todos los controles hijos (NgModel que tengas dentro).
*/

/*
@Output()
Es un decorador de Angular que se usa para definir un evento personalizado en 
un componente hijo, de modo que el componente padre pueda escuchar ese evento.
Se usa junto con EventEmitter, que permite emitir (disparar) valores desde 
el hijo al padre.

new EventEmitter<Type>();
Es una clase que Angular usa para emitir valores personalizados hacia el componente padre.
Se puede emitir cualquier tipo de dato: string, número, objeto, array, etc.

.emit(valor);
Es el método que lanza el evento hacia el padre y le envía un valor.
Cuando se llama .emit(), el componente padre puede capturar ese valor 
con (miEvento) en su plantilla.

(productEvent)="addProduct($event)"
Cuando el hijo hace .emit(valor), se ejecuta addProduct(valor) en el padre, 
y $event es el valor que se emitió.
*/

/*
@Input()
ES un decorador de Angular que permite pasar datos desde un componente padre 
hacia un componente hijo. Es decir, se usa para recibir valores en el hijo 
desde su padre.
Cuando el componente padre renderiza al hijo en su plantilla, le puede 
pasar valores a esa propiedad usando data binding con corchetes [].

  *--En el padre
  <product-form 
    [product]="productSelected">
  </product-form>

  ➡️ Aquí se envía el valor de productSelected del componente padre al product del hijo
  ➡️ Esto enlaza el valor de productSelected con el @Input() product del hijo.
*/

/*
Validación Formulario (con CommonModule)

✅ required, min="1": para las validaciones básicas en HTML.
✅ #name="ngModel": crea una referencia local para controlar su estado (valid/invalid/touched).
✅ *ngIf="name.invalid && name.touched": muestra el mensaje solo cuando el input fue 
tocado y está inválido.
✅ [disabled]="productForm.invalid": desactiva el botón si el formulario está inválido.
*/
@Component({
  selector: 'product-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './form.html',
  styleUrl: './form.scss'
})

export class FormComponent {
  //Atributos
  @Input() product: Product = {
    id: 0,
    name:'',
    description: '',
    price: 0
  };

  //Objeto de emisión (hijo-padre)
  @Output() productEvent = new EventEmitter<Product>();

  //Métodos
  //onSubmit(): Función submit del Form
  onSubmit(productForm: NgForm): void {
    if(productForm.valid) {
      this.productEvent.emit({...this.product});
    }

    productForm.resetForm();
  }

}
