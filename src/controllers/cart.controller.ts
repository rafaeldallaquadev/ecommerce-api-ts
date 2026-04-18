//./src/controllers/cart.controller.ts

import type { Request, Response, NextFunction } from "express";
import * as services from "../services/cart.services.js"
import type { ProductID } from "../types/product.types.js";
import type { CartItems, CartParams, Quantity } from "../types/cart.types.js";
import type { UserId } from "../types/user.types.js";

export async function getCart (req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = req.user;
        const products = await services.cartList({id});
        return res.status(200).json({
            success: true,
            data: products})
        
    } catch (err) {
        next(err)
    }
}

export async function addToCart(req: Request<CartParams, {}, Quantity>, res: Response, next: NextFunction) {
    try {
        const userId = req.user.id;
        const productId = Number(req.params.id)
        const {quantity} = req.body
        const addedItem = await services.addingProduct({userId, productId, quantity})

        return res.status(201).json({
            success: true,
            data: addedItem
        })

    } catch (err) {
        next(err)
    }
}

export async function updateQuantity(req: Request<CartParams, {}, Quantity>, res: Response, next: NextFunction) {
    try {
        const userId = req.user.id
        const productId = Number(req.params.id)
        const {quantity} = req.body

        const newQuantity = await services.putNewQuantity({userId, productId, quantity});

        res.status(200).json({
            success: true,
            data: newQuantity
        })    
    } catch (err) {
        next(err)
    }
}

export async function removeFromCart(req: Request<CartParams>, res: Response, next: NextFunction) {
    try {
        const userId = req.user.id
        const productId = Number(req.params.id)
    
        const removed = await services.removeItem({userId, productId})
    
        return res.status(200).json({
            success: true,
            data: removed
        })
    } catch (err) {
        next(err)
    }
}

export async function checkout(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user.id
        const purchase = await services.completePurchase({id: userId})

        res.status(200).json({
            success: true,
            data: purchase
        })
    } catch (err) {
        next(err)
    }
}