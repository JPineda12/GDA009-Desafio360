import StateService from '../services/state.service.js';
import responseUtils from '../utils/responseUtils.js';
import HttpStatusCode from '../utils/constants/httpStatusCode.js';
import logger from '../utils/logger.js';
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
            logger.info('States endpoint was hit');
            logger.warn('This is a warning log example');
            logger.error('This is an error log example');
            const result = await StateService.getStatesList();
            responseUtils.successResponse(res, "", result, HttpStatusCode.OK);
        } catch (error) {
            next(error);
        }
    },

};

export default StateController;