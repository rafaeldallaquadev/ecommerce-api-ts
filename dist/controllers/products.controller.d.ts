import type { Request, Response, NextFunction } from 'express';
import type { AllowedFilters, CreateProductDTO, ProductID, ProductParams, UpdateProductBody } from '../types/product.types.js';
export declare function newProduct(req: Request<{}, {}, CreateProductDTO>, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateProduct(req: Request<ProductParams, {}, UpdateProductBody>, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteProduct(req: Request<ProductParams>, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function listProducts(req: Request<{}, {}, {}, AllowedFilters>, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getProduct(req: Request<ProductID>, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=products.controller.d.ts.map