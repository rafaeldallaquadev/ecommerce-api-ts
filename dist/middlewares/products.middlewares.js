//./src/middlewares/products.middlewares.ts
import { AppError } from "../error/AppError.js";
export function verifyProduct(req, res, next) {
    try {
        const { name, price, stock } = req.body;
        const isEmpty = (value) => value == null;
        if (typeof name !== "string" || name.trim() === "") {
            throw new AppError("Nome de produto inválido", 400);
        }
        if (isEmpty(price)) {
            throw new AppError("Preço é obrigatório", 400);
        }
        if (Array.isArray(price) || (typeof price === "object" && price !== null)) {
            throw new AppError("Preço inválido", 400);
        }
        const parsedPrice = Number(price);
        if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
            throw new AppError("Preço inválido", 400);
        }
        if (isEmpty(stock)) {
            throw new AppError("Estoque obrigatório", 400);
        }
        if (Array.isArray(stock) || (typeof stock === "object" && stock !== null)) {
            throw new AppError("Estoque inválido", 400);
        }
        const parsedStock = Number(stock);
        if (!Number.isInteger(parsedStock) || parsedStock < 0) {
            throw new AppError("Estoque inválido", 400);
        }
        req.body.name = name.trim();
        req.body.price = parsedPrice;
        req.body.stock = parsedStock;
        return next();
    }
    catch (err) {
        return next(err);
    }
}
export function verifyUpdate(req, res, next) {
    try {
        const { name, description, price, stock } = req.body;
        const id = Number(req.params.id);
        const user_id = req.user.id;
        if (name === undefined &&
            description === undefined &&
            price === undefined &&
            stock === undefined) {
            throw new AppError("Nenhum campo enviado para atualização", 400);
        }
        if (name !== undefined) {
            if (typeof name !== 'string' || name.trim() === "") {
                throw new AppError("Nome inválido", 400);
            }
            req.body.name = name.trim();
        }
        if (price !== undefined) {
            if (Array.isArray(price) || (typeof price === "object" && price !== null)) {
                throw new AppError("Preço inválido", 400);
            }
            const parsedPrice = Number(price);
            if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
                throw new AppError("Preço inválido", 400);
            }
            req.body.price = parsedPrice;
        }
        if (stock !== undefined) {
            if (Array.isArray(stock) || (typeof stock === 'object' && stock !== null)) {
                throw new AppError("Estoque inválido", 400);
            }
            const parsedStock = Number(stock);
            if (!Number.isInteger(parsedStock) || parsedStock < 0) {
                throw new AppError("Estoque inválido", 400);
            }
            req.body.stock = parsedStock;
        }
        if (description !== undefined) {
            if (typeof description !== 'string' || description.trim() === "") {
                throw new AppError("Descrição inválida", 400);
            }
            req.body.description = description.trim();
        }
        return next();
    }
    catch (err) {
        return next(err);
    }
}
//# sourceMappingURL=products.middlewares.js.map