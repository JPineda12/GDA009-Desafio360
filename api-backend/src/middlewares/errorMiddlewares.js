import responseUtils from '../utils/responseUtils.js';

const errorMiddleware = (err, req, res, next) => {
  console.error(err);
  const statusCode = err.status || 500;
  responseUtils.errorResponse(res, { message: err.message, details: err.details }, statusCode);
};

export default errorMiddleware;
