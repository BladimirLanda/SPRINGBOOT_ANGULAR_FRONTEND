import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductComponet } from './products/components/product';

@Component({
  selector: 'app-root', //Etiqueta personalizada
  imports: [CommonModule, ProductComponet], //Importaciones (dependencias, módulos, componentes)
  templateUrl: './app.html', //Vista
  styleUrl: './app.scss' //Hoja de Estilos
})

export class App {
  title = 'Administrador de Productos'; //Propiedades
}
