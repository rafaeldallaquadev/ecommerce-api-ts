//./src/middlewares/error.middlewares.ts
export function errorMiddleware(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500).json({
        success: false,
        error: err.message || "Erro interno no servidor"
    });
}
//# sourceMappingURL=error.middlewares.js.map