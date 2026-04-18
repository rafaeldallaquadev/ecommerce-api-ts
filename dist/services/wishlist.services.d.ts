import type { AddedToWishlistProduct, AddToWishlistDTO, DeletedFromWishlist, DeleteFromWishlistDTO, WishlistFilterDTO } from '../types/wishlist.types.js';
import type { PaginatedProducts } from '../types/product.types.js';
export declare function addProductToWishlist(data: AddToWishlistDTO): Promise<AddedToWishlistProduct>;
export declare function deleteProductFromWishlist(data: DeleteFromWishlistDTO): Promise<DeletedFromWishlist>;
export declare function getProductFromWishlist(data: WishlistFilterDTO): Promise<PaginatedProducts>;
//# sourceMappingURL=wishlist.services.d.ts.map