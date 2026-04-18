//./src/middlewares/user.middlewares.ts
import { isValidEmail, isValidPassword, isValidName } from "../utils/validators.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AppError } from "../error/AppError.js";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET não definido");
}
const jwtSecret = JWT_SECRET;
export function validateRegister(req, res, next) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new AppError("Campos obrigatórios", 400);
        }
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedName = name.trim();
        req.body.email = normalizedEmail;
        req.body.name = normalizedName;
        if (!isValidName(normalizedName)) {
            throw new AppError("Nome inválido", 400);
        }
        if (!isValidEmail(normalizedEmail)) {
            throw new AppError("E-mail inválido", 400);
        }
        if (!isValidPassword(password)) {
            throw new AppError("Senha precisa conter pelo menos 8 caracteres, letras e números", 400);
        }
        return next();
    }
    catch (err) {
        return next(err);
    }
}
export function validateLogin(req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new AppError("Campos obrigatórios", 400);
        }
        req.body.email = email.trim().toLowerCase();
        return next();
    }
    catch (err) {
        return next(err);
    }
}
export async function verifyAuth(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new AppError("Token não fornecido", 401);
        }
        const parts = authHeader.split(" ");
        if (parts.length !== 2) {
            throw new AppError("Token mal formatado", 401);
        }
        const [scheme, token] = parts;
        if (scheme !== "Bearer") {
            throw new AppError("Formato inválido", 401);
        }
        if (!token) {
            throw new AppError("Formato inválido", 401);
        }
        const decoded = jwt.verify(token, jwtSecret);
        if (typeof decoded === 'string') {
            throw new AppError("Token inválido", 400);
        }
        req.user = decoded;
        return next();
    }
    catch (err) {
        return next(err);
    }
}
//# sourceMappingURL=user.middlewares.js.map