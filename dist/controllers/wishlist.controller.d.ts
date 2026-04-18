import type { Request, Response, NextFunction } from 'express';
import type { AllowedFilters, ProductParams } from '../types/product.types.js';
export declare function getWishlist(req: Request<{}, {}, {}, AllowedFilters>, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function postWishlist(req: Request<ProductParams>, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function delWishlist(req: Request<ProductParams>, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=wishlist.controller.d.ts.map