import type { Request, Response, NextFunction } from "express";
import type { CartParams, Quantity } from "../types/cart.types.js";
export declare function getCart(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function addToCart(req: Request<CartParams, {}, Quantity>, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateQuantity(req: Request<CartParams, {}, Quantity>, res: Response, next: NextFunction): Promise<void>;
export declare function removeFromCart(req: Request<CartParams>, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function checkout(req: Request, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=cart.controller.d.ts.map