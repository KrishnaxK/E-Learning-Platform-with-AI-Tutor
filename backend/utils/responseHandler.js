// utils/responseHandler.js

const responseHandler = {
    success: (res, message, data = {}, statusCode = 200) => {
      return res.status(statusCode).json({
        success: true,
        message: message,
        data: data,
      });
    },
  
    error: (res, message, statusCode = 500) => {
      return res.status(statusCode).json({
        success: false,
        message: message,
      });
    },
  
    validationError: (res, errors, statusCode = 400) => {
      return res.status(statusCode).json({
        success: false,
        message: 'Validation failed',
        errors: errors,
      });
    },
  
    unauthorized: (res, message = 'Unauthorized access', statusCode = 401) => {
      return res.status(statusCode).json({
        success: false,
        message: message,
      });
    },
  };
  
  module.exports = responseHandler;
  