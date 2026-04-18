//==================================================================================
//./src/controllers/products.controller.ts
import * as services from '../services/products.services.js'
import type {Request, Response, NextFunction} from 'express'
import type { AllowedFilters, CreateProductDTO, ProductID, ProductParams, UpdateProductBody } from '../types/product.types.js'

export async function newProduct(req: Request<{}, {}, CreateProductDTO>, res: Response, next: NextFunction) {
    try {
        const {name, price, stock} = req.body
        const userId = req.user.id
        const description = req.body.description?.trim() || ""

        const product = await services.createProduct({name, price, stock, userId, description})

        return res.status(201).json({
            success: true,
            data: product
        });
    } catch (err) {
        next(err)
    }
}


export async function updateProduct (req: Request<ProductParams, {}, UpdateProductBody>, res: Response, next: NextFunction) {
    try {

        const id = Number(req.params.id);
        const userId = req.user.id;
        const {name, description, price, stock} = req.body
        const updateData = {
            id,
            userId,
            ...(name !== undefined && { name }),
            ...(description !== undefined && { description }),
            ...(price !== undefined && { price }),
            ...(stock !== undefined && { stock }),
        };
        const product = await services.productPatch(updateData)
        
        return res.status(200).json({
            success: true,
            data: product
        });

    } catch (err) {
        next(err)
    }
}

export async function deleteProduct(req: Request<ProductParams>, res: Response, next: NextFunction) {
    try {
        const id: number = Number(req.params.id)
        const userId = req.user.id
        const product = await services.productRemove({id, userId});

        return res.status(200).json({
            success: true,
            data: product
        });
        
    } catch (err) {
        next(err)
    }
}

export async function listProducts(req: Request<{}, {}, {}, AllowedFilters>, res: Response, next: NextFunction) {
    try {
        const {
            name = '',
            minPrice = 0,
            maxPrice = 1000000,
            inStock = 'false',
            sortBy = 'id',
            order = 'ASC',
            page = 1,
            limit = 10
        } = req.query;
        
        const products = await services.productsFilter({name, minPrice, maxPrice,
            inStock, sortBy, order, page, limit});

        return res.status(200).json({
            success: true,
            data: products
        });
    } catch (err) {
        next(err)
    }
}

export async function getProduct(req: Request<ProductID>, res: Response, next: NextFunction) {
    try {
        const id = req.params.id
        const product = await services.productByID({id});

        return res.status(200).json({
            success: true,
            data: product
        });
    } catch (err) {
        next(err)
    }
}