import type { AddToCartDTO, Cart, DeletedProduct, NewCartProduct, Purchase, RemoveFromCartDTO, UpdateCartDTO, UpdatedProduct } from '../types/cart.types.js';
import type { UserId } from '../types/user.types.js';
export declare function cartList(data: UserId): Promise<Cart>;
export declare function addingProduct(data: AddToCartDTO): Promise<NewCartProduct>;
export declare function putNewQuantity(data: UpdateCartDTO): Promise<UpdatedProduct>;
export declare function removeItem(data: RemoveFromCartDTO): Promise<DeletedProduct>;
export declare function completePurchase(data: UserId): Promise<Purchase>;
//# sourceMappingURL=cart.services.d.ts.map