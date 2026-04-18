//./src/db.ts
import dotenv from 'dotenv';
import mysql, {} from "mysql2/promise";
dotenv.config();
const { DB_HOST, DB_USER, DB_NAME, DB_PASS, DB_PORT } = process.env;
if (!DB_HOST || !DB_USER || !DB_NAME || !DB_PASS) {
    throw new Error("Missing database environment variables");
}
export const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    database: DB_NAME,
    password: DB_PASS,
    port: Number(DB_PORT) || 3306
});
//# sourceMappingURL=db.js.map