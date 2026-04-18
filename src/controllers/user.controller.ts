//==================================================================================
//./src/controllers/user.controller.ts
import * as services from '../services/user.services.js'
import type { RegisterUserDTO, LoginUserDTO } from '../types/user.types.js';
import type { Request, Response, NextFunction } from "express";

export async function register(
    req: Request<{}, {}, RegisterUserDTO>,
    res: Response, 
    next: NextFunction){
    try {
        const user = await services.registerUser(req.body);

       return res.status(201).json({
            success: true,
            data: user
        });
    }catch (err) {
        next(err)
    }
}


export async function login(req: Request<{}, {}, LoginUserDTO>, res: Response, next: NextFunction) {
    try {
        const authResponse = await services.userLogin(req.body)

        return res.status(200).json({
            success: true,
            data: authResponse
        });
        
    }catch (err) {
        next(err)
    }
}

