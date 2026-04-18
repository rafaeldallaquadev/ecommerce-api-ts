//./src/middlewares/error.middlewares.ts

import type { Request, Response, NextFunction } from "express";
import type { AppError } from "../error/AppError.js";

export function errorMiddleware(err: AppError, req:Request, res: Response, next: NextFunction) {
    console.log(err);

    res.status(err.status || 500).json({
        success: false,
        error: err.message || "Erro interno no servidor"
    })
}