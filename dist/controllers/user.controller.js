//==================================================================================
//./src/controllers/user.controller.ts
import * as services from '../services/user.services.js';
export async function register(req, res, next) {
    try {
        const user = await services.registerUser(req.body);
        return res.status(201).json({
            success: true,
            data: user
        });
    }
    catch (err) {
        next(err);
    }
}
export async function login(req, res, next) {
    try {
        const authResponse = await services.userLogin(req.body);
        return res.status(200).json({
            success: true,
            data: authResponse
        });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=user.controller.js.map