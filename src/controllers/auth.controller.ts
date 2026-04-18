//./src/controllers/auth.controller.ts

import * as services from "../services/auth.services.js"
import type { RefreshToken } from "../types/auth.types.js";
import type { Request, Response, NextFunction } from "express";

export async function refreshToken (
    req: Request<{}, {}, RefreshToken>,
    res:Response, 
    next: NextFunction
) {
    try{
        const { refreshToken } = req.body;
      
        const newAccessToken = await services.getNewToken(refreshToken);

        return res.status(200).json({
            success:true,
            data: newAccessToken
        })
    }catch (err) {
        return next(err)
    }
}