import logger from "../utils/logger.js";

const responseUtils = {
  
  successResponse(res, message, data = null, statusCode = 200) {
    const responseStructure = {
      status: 'success',
      message: message,
      data: data,
      statusCode: statusCode
    }

    logger.debug('Success response with ', responseStructure);
    res.status(statusCode).json(responseStructure);
  },

  errorResponse(res, error, statusCode = 500) {
    const errorStructure = {
      status: 'error',
      message: error.message || 'Error no controlado',
      details: error.details || null,
      statusCode: statusCode,
    }

    logger.debug('Error response with ', errorStructure);
    res.status(statusCode).json({
      status: 'error',
      message: error.message || 'Error no controlado',
      details: error.details || null,
      statusCode: statusCode,
    });
  },
}
export default responseUtils
