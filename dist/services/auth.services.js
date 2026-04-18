//src/services/auth.services.ts
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { pool } from '../db.js';
import { AppError } from '../error/AppError.js';
dotenv.config();
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_REFRESH_SECRET) {
    throw new AppError("JWT_REFRESH_SECRET inválido", 401);
}
if (!JWT_SECRET) {
    throw new AppError("JWT_SECRET inválido", 401);
}
const jwtSecret = JWT_SECRET;
const jwtRefreshSecret = JWT_REFRESH_SECRET;
export async function getNewToken(refreshToken) {
    try {
        const decoded = jwt.verify(refreshToken, jwtRefreshSecret);
        const [rows] = await pool.execute('SELECT id, name, email, role FROM users WHERE id = ?', [decoded.id]);
        const user = rows[0];
        if (!user) {
            throw new AppError("Usuário não encontrado", 404);
        }
        const newAccessToken = jwt.sign({ id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }, jwtSecret, { expiresIn: '15m' });
        return { accessToken: newAccessToken };
    }
    catch (err) {
        if (err instanceof AppError) {
            throw err;
        }
        throw new AppError("Refresh token inválido", 401);
    }
}
//# sourceMappingURL=auth.services.js.map