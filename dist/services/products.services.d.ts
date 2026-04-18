import type { CreateProductDTO, FilterDTO, PaginatedProducts, Product, ProductID, ProductPatchDTO, RemoveProductDTO, ReturnProduct } from '../types/product.types.js';
import type { SimpleProductRow } from '../types/mysql.types.js';
export declare function createProduct(data: CreateProductDTO): Promise<Product>;
export declare function productPatch(data: ProductPatchDTO): Promise<ReturnProduct>;
export declare function productRemove(data: RemoveProductDTO): Promise<SimpleProductRow>;
export declare function productsFilter(data: FilterDTO): Promise<PaginatedProducts>;
export declare function productByID(data: ProductID): Promise<ReturnProduct>;
//# sourceMappingURL=products.services.d.ts.map