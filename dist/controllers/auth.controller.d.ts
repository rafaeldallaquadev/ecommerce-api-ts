import type { RefreshToken } from "../types/auth.types.js";
import type { Request, Response, NextFunction } from "express";
export declare function refreshToken(req: Request<{}, {}, RefreshToken>, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=auth.controller.d.ts.map