import { Component } from '@angular/core';
import { ProductService } from '../services/product-service';
import { Product } from '../models/product';
import { FormComponent } from './form/form';

@Component({
  selector: 'app-product',
  imports: [FormComponent],
  templateUrl: './product.html',
  styleUrl: './product.scss'
})

export class ProductComponet {
  //Atributos
  products: Product[] = [];
  productSelected: Product = new Product();

  //Constructor
  constructor(private service : ProductService) { }

  //Métodos
  //ngOnInit(): Llamada de función cuando se instala un componente
  ngOnInit(): void {
    //.subscribe(): Petición de acción
    //next(): Entonces si todo bien (then)
    //error(): Si error (error)
    this.service.findAll().subscribe({
      next: hadProducts => this.products = hadProducts,
      error: err => alert(err.message)
    });
  }

  addProduct(product : Product) : void {
    if(product.id > 0) {
      this.service.update(product).subscribe({
        next: updatedProduct => this.products = this.products.map(p => p.id === updatedProduct.id ? updatedProduct : p),
        error: err => alert(err.message)
      });
      
    } else {
      this.service.create(product).subscribe({
        next: newProduct => this.products = [...this.products, newProduct],
        error: err => alert(err.message)
      });
    }

    this.productSelected = new Product();
  }

  onUpdateProduct(product : Product) : void {
    this.productSelected= {...product};
  }

  onDeleteProduct(id : number) : void {
    this.service.delete(id).subscribe({
      next: () => this.products = this.products.filter(p => p.id !== id),
      error: err => alert(err.message)
    });
  }
}
