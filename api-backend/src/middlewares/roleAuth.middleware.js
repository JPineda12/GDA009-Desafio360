import AppError from "../utils/AppError.js";
import HttpStatusCode from "../utils/constants/httpStatusCode.js";

function RoleAuthorization(...allowedRoles) {
    return (req, _, next) => {
      const userRole = req.user?.idRol;
      if (!allowedRoles.includes(userRole)) {
        logger.error('Unauthorized role to this route ', exception)
        throw new AppError('Rol no autorizado', HttpStatusCode.FORBIDDEN)
      }
      next();
    };
  }


  export default RoleAuthorization;