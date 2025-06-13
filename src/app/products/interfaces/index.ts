import { Product } from "../models/product";

//INTERFACES
export interface ProductsHALResponse {
  _embedded: {
    products: Product[];
  };
}