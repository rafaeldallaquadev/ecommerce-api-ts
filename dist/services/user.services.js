//src/services/user.services.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';
import dotenv from 'dotenv';
import { AppError } from '../error/AppError.js';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET não definido");
}
if (!JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET não definido");
}
const secret = JWT_SECRET;
const refreshSecret = JWT_REFRESH_SECRET;
export async function registerUser(data) {
    const { name, email, password } = data;
    if (!name || !email || !password) {
        throw new AppError("Campos obrigatórios", 400);
    }
    const emailNormalized = email.trim().toLowerCase();
    const nameNormalized = name.trim();
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    try {
        const [result] = await pool.execute('insert into users (name, email, password) values (?, ?, ?)', [nameNormalized, emailNormalized, hashedPassword]);
        return {
            id: result.insertId,
            name: nameNormalized,
            email: emailNormalized,
            role: 'user'
        };
    }
    catch (err) {
        if (err instanceof AppError) {
            throw err;
        }
        const dbError = err;
        if (dbError.code === 'ER_DUP_ENTRY') {
            throw new AppError("Email já cadastrado", 400);
        }
        throw new AppError("Erro interno", 500);
    }
}
export async function userLogin(data) {
    const { email, password } = data;
    const emailNormalized = email.trim().toLowerCase();
    const [rows] = await pool.execute('SELECT id, name, email, password, role from users where email = ?', [emailNormalized]);
    if (rows.length === 0) {
        throw new AppError("Email ou senha inválidos", 401);
    }
    const user = rows[0];
    if (!user) {
        throw new AppError("Email ou senha inválidos", 401);
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new AppError("Email ou senha inválidos", 401);
    }
    const accessToken = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, secret, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user.id }, refreshSecret, { expiresIn: '7d' });
    return {
        accessToken,
        refreshToken,
        id: user.id,
        name: user.name,
        email: user.email
    };
}
//# sourceMappingURL=user.services.js.map