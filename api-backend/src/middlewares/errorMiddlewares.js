import responseUtils from '../utils/responseUtils.js';

const errorMiddleware = (err, _, res, next) => {
  const statusCode = err instanceof Error && err.status ? err.status : 500;
  responseUtils.errorResponse(
    res,
    { message: err.message || 'Error no controlado', details: err.details || null },
    statusCode
  );
};

export default errorMiddleware;
