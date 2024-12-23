import RoleService from '../services/role.service.js';
import responseUtils from '../utils/responseUtils.js';
import HttpStatusCode from '../utils/constants/httpStatusCode.js';

const RoleController = {
    async create(req, res, next) {
        try {
            const result = await RoleService.createRole(req.body);
            responseUtils.successResponse(res, "", result, HttpStatusCode.OK);
        } catch (error) {
            next(error);
        }
    },

    async getRolesList(_, res, next) {
        try {
            const result = await RoleService.getRolesList();
            responseUtils.successResponse(res, "", result, HttpStatusCode.OK);
        } catch (error) {
            next(error);
        }
    },

};

export default RoleController;