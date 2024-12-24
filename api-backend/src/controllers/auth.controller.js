import AuthService from "../services/auth.service.js";
import responseUtils from '../utils/responseUtils.js';
import HttpStatusCode from '../utils/constants/httpStatusCode.js';

const AuthController = {
    async login(req, res, next) {
        try {
            const result = await AuthService.login(req.body);
            responseUtils.successResponse(res, "", result, HttpStatusCode.OK);
        } catch (error) {
            next(error);
        }
    }
};

export default AuthController;