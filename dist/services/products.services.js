//src/services/products.services.ts
import { pool } from '../db.js';
import { AppError } from '../error/AppError.js';
export async function createProduct(data) {
    const { name, description, price, stock, userId } = data;
    const [result] = await pool.execute('INSERT into products (name, description, price, stock, user_id) values (?, ?, ?, ?, ?)', [name, description, price, stock, userId]);
    return {
        id: result.insertId,
        name,
        description,
        price,
        stock,
        userId
    };
}
export async function productPatch(data) {
    const { id, name, price, stock, userId, description } = data;
    const queryBase = 'UPDATE products SET ';
    const queryArray = [];
    const queryParams = [];
    if (name !== undefined) {
        queryArray.push('name = ?');
        queryParams.push(name.trim());
    }
    if (description !== undefined) {
        queryArray.push('description = ?');
        queryParams.push(description.trim());
    }
    if (price !== undefined) {
        queryArray.push('price = ?');
        queryParams.push(price);
    }
    if (stock !== undefined) {
        queryArray.push('stock = ?');
        queryParams.push(stock);
    }
    if (queryArray.length === 0) {
        throw new AppError("Nenhum campo para atualizar", 400);
    }
    const queryPart = queryArray.join(', ');
    const query = queryBase + queryPart + ' WHERE id = ? AND user_id = ?';
    const finalQuery = query;
    const [result] = await pool.query(query, [...queryParams, id, userId]);
    const [rows] = await pool.query('select id, name, description, price, stock from products where id = ? and user_id = ?', [id, userId]);
    const produtoAtualizado = rows[0];
    if (!produtoAtualizado) {
        throw new AppError("Produto não encontrado", 404);
    }
    return produtoAtualizado;
}
export async function productRemove(data) {
    const { id, userId } = data;
    const [rows] = await pool.execute('select id, name from products where id = ? AND user_id = ?', [id, userId]);
    const removedProduct = rows[0];
    const [result] = await pool.execute('delete from products where id = ? AND user_id = ?', [id, userId]);
    if (result.affectedRows === 0) {
        throw new AppError("Produto não encontrado", 404);
    }
    if (!removedProduct) {
        throw new AppError("Produto não encontrado", 404);
    }
    return removedProduct;
}
export async function productsFilter(data) {
    const { name, minPrice, maxPrice, inStock, sortBy, order, page, limit } = data;
    const pageNumber = page || 1;
    const limitNumber = limit || 10;
    const offset = (pageNumber - 1) * limitNumber;
    let query = 'SELECT id, name, description, price, stock FROM products WHERE name LIKE ? AND price BETWEEN ? AND ?';
    const params = [`%${name}%`, minPrice, maxPrice];
    if (inStock === "true") {
        query += ' AND stock > 0';
    }
    const allowedSortBy = ['id', 'name', 'price'];
    const allowedOrder = ['ASC', 'DESC'];
    const sortColumn = allowedSortBy.includes(sortBy) ? sortBy : 'id';
    const sortOrder = allowedOrder.includes(order.toUpperCase()) ? order.toUpperCase() : 'ASC';
    query += ` ORDER BY ${sortColumn} ${sortOrder} LIMIT ${limitNumber} OFFSET ${offset}`;
    const [rows] = await pool.execute(query, params);
    return { page: page, limit: limit, data: rows };
}
export async function productByID(data) {
    const { id } = data;
    const [rows] = await pool.execute('select id, name, price, stock, description from products where id = ?', [id]);
    if (rows.length === 0) {
        throw new AppError("Não foi possível encontrar o produto", 404);
    }
    const product = rows[0];
    if (!product) {
        throw new AppError("Não foi possível encontrar o produto", 404);
    }
    return product;
}
//# sourceMappingURL=products.services.js.map