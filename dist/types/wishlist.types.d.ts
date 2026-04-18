export type AddToWishlistDTO = {
    userId: number;
    productId: number;
};
export type AddedToWishlistProduct = {
    id: number;
    userId: number;
    productId: number;
};
export type DeleteFromWishlistDTO = {
    userId: number;
    productId: number;
};
export type DeletedFromWishlist = {
    userId: number;
    productId: number;
};
export type WishlistFilterDTO = {
    userId: number;
    name: string;
    minPrice: number;
    maxPrice: number;
    inStock: 'true' | 'false';
    sortBy: 'id' | 'name' | 'price';
    order: 'ASC' | 'DESC';
    page: number;
    limit: number;
};
export type WishlistObj = {
    id: number;
    userId: number;
    productId: number;
};
//# sourceMappingURL=wishlist.types.d.ts.map