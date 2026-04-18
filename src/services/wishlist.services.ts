//src/services/wishlist.services.ts
import type { ResultSetHeader } from 'mysql2';
import {pool} from '../db.js'
import type { AddedToWishlistProduct, AddToWishlistDTO, DeletedFromWishlist, DeleteFromWishlistDTO, WishlistFilterDTO } from '../types/wishlist.types.js';
import { AppError } from '../error/AppError.js';
import type { ProductRow, WishlistObjRow } from '../types/mysql.types.js';
import type { PaginatedProducts } from '../types/product.types.js';

export async function addProductToWishlist(data: AddToWishlistDTO): Promise<AddedToWishlistProduct> {
    const {userId, productId} = data
    try {
        const [result] = await pool.execute<ResultSetHeader>(
            'insert into wishlist (user_id, product_id) values (?, ?)',
            [userId, productId]
        )

    
        return {
            id: result.insertId,
            userId,
            productId
        }
    } catch (err) {
        if (err instanceof AppError){
            throw err
        }
        const dbError = err as {code?: string}
        if (dbError.code === 'ER_NO_REFERENCED_ROW_2'){
            throw new AppError("Produto não encontrado", 404);
        }
        if (dbError.code === 'ER_DUP_ENTRY') {
            throw new AppError("Produto já está na lista de desejos", 409);
        }

        throw new AppError("Erro interno", 500)
    }
}

export async function deleteProductFromWishlist(data: DeleteFromWishlistDTO): Promise<DeletedFromWishlist> {
    const {userId, productId} = data
    const [result] = await pool.execute<ResultSetHeader>(
        'delete from wishlist where user_id = ? and product_id = ?',
        [userId, productId]
    )

    if (result.affectedRows === 0) {
        throw new AppError("Produto não está na lista de desejos", 404)
    }

    return {
        userId,
        productId
    }
}

export async function getProductFromWishlist(data: WishlistFilterDTO): Promise<PaginatedProducts>{
        const {
            userId,
            name, 
            minPrice,
            maxPrice,
            inStock,
            sortBy,
            order,
            page,
            limit
        } = data
        try {
            const pageNumber = page || 1;
            
            const limitNumber = limit || 10;
            const offset = (pageNumber - 1) * limitNumber;
            
            const [lista] = await pool.execute<WishlistObjRow[]>(
                'select id, user_id, product_id from wishlist where user_id = ?',
                [userId]
            )
            const ids = lista.map(i => i.product_id)
            const placeholders = ids.map(() => '?').join(',');
            if (ids.length === 0) {
                return {
                page: pageNumber,
                limit: limitNumber,
                data: []
            }
            }
            let query = `SELECT id, name, description, price, stock FROM products WHERE id in (${placeholders}) AND price BETWEEN ? AND ?`
            
            if (inStock === 'true') {
                query += ' AND stock > 0';
            }
            
            const allowedSortBy = ['id', 'name', 'price'];
            const allowedOrder = ['ASC', 'DESC'];
            
            const sortColumn = allowedSortBy.includes(sortBy) ? sortBy : 'id';
            const sortOrder = allowedOrder.includes(order.toUpperCase()) ? order.toUpperCase() : 'ASC';
            
            query += ` ORDER BY ${sortColumn} ${sortOrder} LIMIT ${limitNumber} OFFSET ${offset}`;
            
            const [rows] = await pool.execute<ProductRow[]>(
                query,
                [...ids, minPrice, maxPrice]
            )
    
            return {
                page: pageNumber,
                limit: limitNumber,
                data: rows
            }
        } catch (err) {
            throw err
        }
}
