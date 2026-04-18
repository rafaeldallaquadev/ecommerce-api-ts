import type { Request, Response, NextFunction } from "express";
export declare function validateRegister(req: Request, res: Response, next: NextFunction): void;
export declare function validateLogin(req: Request, res: Response, next: NextFunction): void;
export declare function verifyAuth(req: Request, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=user.middlewares.d.ts.map