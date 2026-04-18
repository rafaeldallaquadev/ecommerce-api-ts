//./src/controllers/auth.controller.ts
import * as services from "../services/auth.services.js";
export async function refreshToken(req, res, next) {
    try {
        const { refreshToken } = req.body;
        const newAccessToken = await services.getNewToken(refreshToken);
        return res.status(200).json({
            success: true,
            data: newAccessToken
        });
    }
    catch (err) {
        return next(err);
    }
}
//# sourceMappingURL=auth.controller.js.map