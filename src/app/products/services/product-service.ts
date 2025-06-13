import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductsHALResponse } from '../interfaces';

/*
HttpClient
Es el servicio de Angular para hacer peticiones HTTP (GET, POST, PUT, DELETE, etc.).
Proporciona métodos que devuelven Observables, lo que permite manejar 
asincronía, cancelación, operadores reactivos, etc.

Método	            Descripción
get<T>(url)	        Hace una petición GET y devuelve Observable<T>
post<T>(url, body)	Petición POST con body, devuelve Observable<T>
put<T>(url, body)	  Petición PUT con body
delete<T>(url)	    Petición DELETE

.pipe(...)
pipe es un método que permite encadenar operadores rxjs para transformar, 
filtrar, manejar errores, etc. el Observable.

  observable.pipe(
  map(...),
  filter(...),
  catchError(...)
  )

map()
map recibe la respuesta completa de la API (que en este caso es un objeto 
que contiene la propiedad _embedded.products). Extrae sólo el arreglo real
de productos para que el observable final emita directamente un arreglo Product[].
*/
@Injectable({
  providedIn: 'root'
})

export class ProductService {
  //Atributos (prueba)
  private products: Product[] = [
    {
      id: 1,
      name: "Bocina",
      description: "Bocina Azul",
      price: 550
    },
    {
      id: 2,
      name: "Monitor",
      description: "Monitor 72 pulgadas",
      price: 830
    }
  ];

  private urlBase: string = "http://localhost:8080/products";

  //Constructor
  constructor(private http: HttpClient) { } //Ingresar provideHttpClient() al app.config.ts

  //Métodos
  //Observables (Promise)
  findAll(): Observable<Product[]> {
    /*return of(this.products); - of(): crea un Observable a partir de valores*/
    return this.http.get<ProductsHALResponse>(this.urlBase).pipe(
      map(response => response._embedded.products),
      catchError(error => {
        console.error('Error al obtener productos:', error);
        return throwError(() => new Error('Error al obtener productos'));
      })
    );
  }

  create(product : Product): Observable<Product> {
    return this.http.post<Product>(this.urlBase, product).pipe(
      catchError(error => {
        console.error('Error al crear producto:', error);
        return throwError(() => new Error('Error al crear producto'));
      })
    )
  }

  update(product : Product): Observable<Product> {
    return this.http.put<Product>(`${this.urlBase}/${product.id}`, product).pipe(
      catchError(error => {
        console.error('Error al actualizar producto:', error);
        return throwError(() => new Error('Error al actualizar producto'));
      })
    )
  }

  delete(id : Product['id']): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar producto:', error);
        return throwError(() => new Error('Error al eliminar producto'));
      })
    )
  }
}
