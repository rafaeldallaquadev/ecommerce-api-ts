export function errorMiddleware(err, req, res, next) {
    console.log(err);

    res.status(err.status || 500).json({
        error: err.message || "Erro interno no servidor"
    })
}