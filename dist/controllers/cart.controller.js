//./src/controllers/cart.controller.ts
import * as services from "../services/cart.services.js";
export async function getCart(req, res, next) {
    try {
        const { id } = req.user;
        const products = await services.cartList({ id });
        return res.status(200).json({
            success: true,
            data: products
        });
    }
    catch (err) {
        next(err);
    }
}
export async function addToCart(req, res, next) {
    try {
        const userId = req.user.id;
        const productId = Number(req.params.id);
        const { quantity } = req.body;
        const addedItem = await services.addingProduct({ userId, productId, quantity });
        return res.status(201).json({
            success: true,
            data: addedItem
        });
    }
    catch (err) {
        next(err);
    }
}
export async function updateQuantity(req, res, next) {
    try {
        const userId = req.user.id;
        const productId = Number(req.params.id);
        const { quantity } = req.body;
        const newQuantity = await services.putNewQuantity({ userId, productId, quantity });
        res.status(200).json({
            success: true,
            data: newQuantity
        });
    }
    catch (err) {
        next(err);
    }
}
export async function removeFromCart(req, res, next) {
    try {
        const userId = req.user.id;
        const productId = Number(req.params.id);
        const removed = await services.removeItem({ userId, productId });
        return res.status(200).json({
            success: true,
            data: removed
        });
    }
    catch (err) {
        next(err);
    }
}
export async function checkout(req, res, next) {
    try {
        const userId = req.user.id;
        const purchase = await services.completePurchase({ id: userId });
        res.status(200).json({
            success: true,
            data: purchase
        });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=cart.controller.js.map