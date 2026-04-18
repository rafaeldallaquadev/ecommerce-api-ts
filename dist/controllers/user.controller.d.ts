import type { RegisterUserDTO, LoginUserDTO } from '../types/user.types.js';
import type { Request, Response, NextFunction } from "express";
export declare function register(req: Request<{}, {}, RegisterUserDTO>, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function login(req: Request<{}, {}, LoginUserDTO>, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=user.controller.d.ts.map