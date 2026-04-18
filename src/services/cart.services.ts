//src/services/cart.services.ts

import type { ResultSetHeader } from 'mysql2'
import {pool} from '../db.js'
import { AppError } from '../error/AppError.js'
import type { 
    AddToCartDTO, 
    Cart, 
    DeletedProduct, 
    NewCartProduct, 
    Purchase, 
    RemoveFromCartDTO, 
    UpdateCartDTO, 
    UpdatedProduct} from '../types/cart.types.js'
import type{
    OrderRow, 
    StockRow, 
    CartItemsRow , 
    CartProductsRow, 
    UserCartRow } from '../types/mysql.types.js'
import type { UserId } from '../types/user.types.js'


export async function cartList(data: UserId): Promise<Cart> {
    const {id} = data
    try {
        const [rows] = await pool.execute<CartProductsRow[]>(
            `select 
                p.id, 
                p.name, 
                p.price,
                ci.quantity 
            from cart c
            JOIN cart_items ci ON ci.cart_id = c.id
            JOIN products p ON p.id = ci.product_id
            WHERE c.user_id = ?
            AND c.status = "active" `,
            [id])
    
        if (rows.length === 0) {
            throw new AppError("Carrinho vazio", 404);
        }
        const cart = rows
    
        return cart
        
    } catch (err) {
        if (err instanceof AppError){
            throw err
        }
        throw new AppError("Carrinho inexistente", 404)
    }   
}

export async function addingProduct(data: AddToCartDTO): Promise<NewCartProduct> {
    const {userId, productId, quantity} = data
    try {
        const parsedProductId = Number(productId);
        const parsedQuantity = Number(quantity)

        if (isNaN(parsedProductId)){
                throw new AppError("ID de produto inválido", 400)
            }
            
        if (isNaN(parsedQuantity) || parsedQuantity <= 0){
            throw new AppError("Quantidade inválida", 400)
        }
        
        const [cart] = await pool.execute<UserCartRow[]>(
            `SELECT id, user_id FROM cart WHERE user_id = ? AND status = "active" LIMIT 1`,
            [userId]
        );
        
        let cartId

        const activeCart = cart[0]
    
        if (!activeCart) {
            const [newCart] = await pool.execute<ResultSetHeader>(
                `INSERT INTO cart (user_id, status) VALUES (?, "active")`,
                [userId]
            );
            
            cartId = newCart.insertId;
        } else {
            cartId = activeCart.id
        }
    
        const [existingItem] = await pool.execute<CartItemsRow[]>(
            `select * from cart_items where cart_id = ? and product_id = ?`,
            [cartId, parsedProductId]
        )
        
        if (existingItem.length > 0) {
            await pool.execute('UPDATE cart_items set quantity = quantity + ? where cart_id = ? and product_id = ?',
                [parsedQuantity, cartId, parsedProductId]);
            } else {
            await pool.execute(
                    `INSERT INTO cart_items 
                    (cart_id, product_id, quantity) 
                    VALUES
                    (?, ?, ?)`,
                    [cartId, parsedProductId, parsedQuantity])
                }
                
            return {
                cartId: cartId,
                productId: parsedProductId,
                quantity: parsedQuantity
            }    
    } catch (err) {
        if (err instanceof AppError){
            throw err
        }
        const dbError = err as {code?: string}
        if (dbError.code === "ER_NO_REFERENCED_ROW_2"){
            throw new AppError("Produto não encontrado", 404)
        }
        throw new AppError("Erro interno", 500)
    }
}

export async function putNewQuantity(data: UpdateCartDTO): Promise<UpdatedProduct> {
    const {userId, productId, quantity} = data
    try {
        const parsedProductId = Number(productId)
        const parsedQuantity = Number(quantity)

        console.log(parsedQuantity)
        if (parsedProductId === undefined || isNaN(parsedProductId)) {
            throw new AppError("ID de produto inválido", 400)
        }

        if (parsedQuantity === undefined || isNaN(parsedQuantity) || parsedQuantity <= 0) {
            throw new AppError("Quantidade inválida", 400)
        }
    
        const [cart] = await pool.execute<UserCartRow[]>(
            `SELECT id, user_id FROM cart WHERE user_id = ? AND status = 'active'`,
            [userId]
        )

        const activeCart = cart[0]


    
        if (!activeCart) {
            throw new AppError("Carrinho não encontrado", 404)
        }
        
        const cartId = activeCart.id

        const [result] = await pool.execute<ResultSetHeader>(
            `UPDATE cart_items
            SET quantity = ?
            WHERE product_id = ? AND cart_id = ?`,
            [parsedQuantity, parsedProductId, cartId]
        )

        if (result.affectedRows === 0) {
            throw new AppError("Produto não está no carrinho", 404)
        }
    
        return {
            productId: parsedProductId,
            quantity: parsedQuantity
        }
    } catch (err) {
        throw err
    }
}

export async function removeItem(data: RemoveFromCartDTO): Promise <DeletedProduct> {
    const {userId, productId} = data
    try {
        const parsedProductId = Number(productId)

        if (isNaN(parsedProductId)){
            throw new AppError("ID de produto inválido", 400)
        }
    
        const [cart] = await pool.execute<UserCartRow[]>(
            `SELECT id, user_id FROM cart WHERE user_id = ? AND status = 'active'`,
            [userId]
        )

        const activeCart = cart[0]
    
        if (!activeCart) {
            throw new AppError(`Carrinho não encontrado`,404);
        }
        const cartId = activeCart.id;
    
        const [result] = await pool.execute<ResultSetHeader>(
            `delete from cart_items where cart_id = ? AND product_id = ?`,
            [cartId, parsedProductId]
        )
    
        if (result.affectedRows === 0) {
            throw new AppError("Produto não se encontra no carrinho", 404);
        }
    
        return {
            productId: productId
        }
    } catch (err) {
        throw err
    }
}

export async function completePurchase(data: UserId): Promise<Purchase>{
    const {id} = data
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();
        const [cartItems] = await connection.execute<OrderRow[]>(
            `SELECT 
                p.id,
                p.name,
                p.price,
                p.stock,
                ci.quantity
            FROM products p
            JOIN cart_items ci ON ci.product_id = p.id
            JOIN cart c ON c.id = ci.cart_id
            WHERE c.user_id = ? 
            AND c.status = 'active'
            FOR UPDATE`,
            [id]
        );


        if (cartItems.length === 0) {
            throw new AppError("Carrinho vazio", 404);
        }

        const [insufficientStock] = await connection.execute<StockRow[]>(
            `
            SELECT p.id
            FROM products p
            JOIN cart_items ci ON ci.product_id = p.id
            JOIN cart c ON c.id = ci.cart_id
            WHERE c.user_id = ?
            AND c.status = 'active'
            AND ci.quantity > p.stock
            `,
            [id]
        );

        if (insufficientStock.length > 0) {
            throw new AppError("Estoque insuficiente", 409);
        }

        const params = cartItems.map(i => [i.id, i.quantity]);
        const ids = params.map(i => i[0]);

        let caseSql = 'CASE id ';
        params.forEach(([id]) => {
            caseSql += `WHEN ${id} THEN ? `;
        });
        caseSql += 'END';

        const sql = `
            UPDATE products
            SET stock = stock - ${caseSql}
            WHERE id IN (${ids.map(() => '?').join(',')})
        `;

        const values = [
            ...params.map(i => i[1]),
            ...ids
        ];

        await connection.query(sql, values);

        
        await connection.execute(
            `
            UPDATE cart
            SET status = "completed"
            WHERE user_id = ? 
            AND status = 'active'
            `,
            [id]
        );

        await connection.commit();

        const finalPrice = cartItems.reduce(
            (total, i) => total + i.price * i.quantity,
            0
        );

        return {
            message: "Compra efetuada com sucesso",
            products: cartItems,
            total: finalPrice
        };

    } catch (err) {
        await connection.rollback();
        throw err;

    } finally {
        connection.release();
    }
}