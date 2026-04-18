import type { Request, Response, NextFunction } from "express";
import type { AppError } from "../error/AppError.js";
export declare function errorMiddleware(err: AppError, req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=error.middlewares.d.ts.map