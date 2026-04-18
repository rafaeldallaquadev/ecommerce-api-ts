//src/types/express.d.ts
import "express";

declare global {
    namespace Express {
        interface Request {
            user: {
                id: number;
                name?: string;
                email?: string;
                role?: "user" | "admin";
            }
        }
    }
}