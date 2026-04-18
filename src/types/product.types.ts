//src/types/product.types.ts

import { updateProduct } from "../controllers/products.controller.js";

export type CreateProductDTO = {
    name: string;
    price: number; 
    stock: number; 
    userId: number; 
    description: string;
}

export type UpdateProductBody = {
    name?: string;
    price?: number; 
    stock?: number; 
    description?: string;
}

export type ProductPatchDTO = {
    id: number;
    userId: number; 
    name?: string;
    price?: number; 
    stock?: number; 
    description?: string;
}

export type ProductParams = {
    id: string;
}

export type Product = {
    id:number;
    name: string;
    price: number; 
    stock: number; 
    userId: number; 
    description: string;
}

export type ReturnProduct = {
    id:number;
    name: string;
    price: number; 
    stock: number; 
    description: string;
}

export type ProductID = {
    id: number;
}

export type RemoveProductDTO = {
    id: number;
    userId: number;
}

export type SimpleProduct = {
    id:number;
    name:string;
}


export type FilterDTO = {
    name: string; 
    minPrice: number; 
    maxPrice: number;
    inStock: 'true' | 'false';
    sortBy: 'id' | 'name' | 'price'; 
    order: 'ASC' | 'DESC';
    page: number; 
    limit: number;
}

export type AllowedFilters = Partial<FilterDTO>

type PaginatedProduct = ReturnProduct[]

export type PaginatedProducts = {
    page: number;
    limit: number;
    data: PaginatedProduct
}


export type ValidProduct = {
    name: string;
    price: number;
    stock: number;
}

export type ValidUpdate = {
    name: string;
    description: string;
    price:number;
    stock: number
}