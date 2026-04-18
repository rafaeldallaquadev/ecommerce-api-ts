//src/types/cart.types.ts

export type CartProduct = {
    id: number;
    name: string;
    price:number;
    quantity:number;
}

export type Cart = CartProduct[]


export type AddToCartDTO = {
    userId:number;
    productId:number; 
    quantity: number;
}

export type RemoveFromCartDTO = {
    userId: number;
    productId:number;
}

export type UpdateCartDTO = {
    userId:number;
    productId:number; 
    quantity: number;
}

export type UserCart = {
    id:number;
    userId: number;
}

export type NewCartDTO = {
    id: number
}

export type CartItems = {
    id: number;
    cartId:number;
    productId:number;
    quantity:number;
}

export type NewCartProduct = {
    cartId:number;
    productId:number;
    quantity:number;
}

export type UpdatedProduct = {
    productId: number;
    quantity: number;
}

export type DeletedProduct = {
    productId: number;
}

export type Order = {
    id: number;
    name: string;
    price: number;
    stock: number;
    quantity: number;
}

export type StockId = {
    productId: number
}

export type Purchase = {
    message:string;
    products: Order[];
    total: number
}

export type Quantity = {
    quantity: number
}

export type CartParams = {
    id: string;
}