import AppError from "../utils/AppError.js";
import HttpStatusCode from "../utils/constants/httpStatusCode.js";

function RoleAuthorization(...allowedRoles) {
    return (req, res, next) => {
      const userRole = req.user?.idRol;
      console.log("USERROLE: ", userRole)
      console.log("ALLOWED: ", allowedRoles)
      if (!allowedRoles.includes(userRole)) {
        throw new AppError('Rol no autorizado', HttpStatusCode.FORBIDDEN)
      }
      next();
    };
  }


  export default RoleAuthorization;