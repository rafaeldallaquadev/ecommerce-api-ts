import type { Request, Response, NextFunction } from "express";
import type { ValidProduct, ValidUpdate } from "../types/product.types.js";
import type { VerifyPayload } from "../types/auth.types.js";
export declare function verifyProduct(req: Request<{}, {}, ValidProduct>, res: Response, next: NextFunction): void;
export declare function verifyUpdate(req: Request<VerifyPayload, {}, ValidUpdate>, res: Response, next: NextFunction): void;
//# sourceMappingURL=products.middlewares.d.ts.map