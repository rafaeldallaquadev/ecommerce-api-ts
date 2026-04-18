//==================================================================================
//./src/controllers/wishlist.controller.ts

import type { Request, Response, NextFunction } from 'express';
import * as services from '../services/wishlist.services.js'
import type { AllowedFilters, ProductID, ProductParams } from '../types/product.types.js';

export async function getWishlist(req: Request<{},{},{}, AllowedFilters>, res: Response, next: NextFunction) {
    try {
        const {
            name = '',
            minPrice = 0,
            maxPrice = 1000000,
            inStock = 'true',
            sortBy = 'id',
            order = 'ASC',
            page = 1,
            limit = 10
        } = req.query;

        const userId = req.user.id;
        const products = await services.getProductFromWishlist({name, minPrice, maxPrice,
            inStock, sortBy, order, page, limit, userId})
    
        return res.status(200).json({
            success: true,
            data: products
        });;
    } catch (err) {
        next(err)
    }
}


export async function postWishlist(req:Request<ProductParams>, res:Response, next:NextFunction) {
    try {
        const userId = req.user.id;
        const productId = Number(req.params.id);
        
        const newWish = await services.addProductToWishlist({userId, productId});


        return res.status(201).json({
            success: true,
            data: newWish
        });
        
    } catch (err) {
        next(err)
    }

}

export async function delWishlist(req: Request<ProductParams>, res: Response, next: NextFunction) {
    try {
        const userId = req.user.id;
        const productId = Number(req.params.id);

        const deleted = await services.deleteProductFromWishlist({userId, productId});

        return res.status(200).json({
            success: true,
            data: deleted
        });
    } catch (err) {
        next(err)
    }
}