const responseUtils = {
  
  successResponse(res, message, data = null, statusCode = 200) {
    res.status(statusCode).json({
      status: 'success',
      message: message,
      data: data,
      statusCode: statusCode,
    });
  },

  errorResponse(res, error, statusCode = 500) {
    res.status(statusCode).json({
      status: 'error',
      message: error.message || 'Error no controlado',
      details: error.details || null,
      statusCode: statusCode,
    });
  },
}
export default responseUtils
