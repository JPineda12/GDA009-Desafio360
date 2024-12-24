import StateService from '../services/state.service.js';
import responseUtils from '../utils/responseUtils.js';
import HttpStatusCode from '../utils/constants/httpStatusCode.js';

const StateController = {
    async create(req, res, next) {
        try {
            const result = await StateService.createState(req.body);
            responseUtils.successResponse(res, "", result, HttpStatusCode.OK);
        } catch (error) {
            next(error);
        }
    },

    async getStatesList(_, res, next) {
        try {
            const result = await StateService.getStatesList();
            responseUtils.successResponse(res, "", result, HttpStatusCode.OK);
        } catch (error) {
            next(error);
        }
    },

};

export default StateController;