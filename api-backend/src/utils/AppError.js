class AppError extends Error {
    constructor(message, status, details = null) {
      super(message);
      this.status = status;
      this.details = details;
    }
  }
  
  export default AppError;
  