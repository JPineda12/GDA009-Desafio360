import StateService from '../services/state.service.js';
import responseUtils from '../utils/responseUtils.js';
import HttpStatusCode from '../utils/constants/httpStatusCode.js';
import logger from '../utils/logger.js';
const StateController = {
    async create(req, res, next) {
        try {
            logger.info('State create endpoint was hit with: ', req.body)
            const result = await StateService.createState(req.body);
            responseUtils.successResponse(res, "", result, HttpStatusCode.OK);
        } catch (error) {
            logger.error('Create state endpoint controller error ', error)
            next(error);
        }
    },

    async getStatesList(_, res, next) {
        try {
            logger.info('States endpoint was hit');
            const result = await StateService.getStatesList();
            responseUtils.successResponse(res, "", result, HttpStatusCode.OK);
        } catch (error) {
            logger.error('Get States List controller error ', error);            
            next(error);
        }
    },

};

export default StateController;