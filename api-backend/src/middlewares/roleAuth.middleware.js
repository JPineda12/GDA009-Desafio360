import AppError from "../utils/AppError.js";
import HttpStatusCode from "../utils/constants/httpStatusCode.js";
import logger from "../utils/logger.js";
import jwtUtils from '../utils/jwtUtils.js'

function RoleAuthorization(...rolesPermitidos) {

    return (req, _, next) => {
      const token = req.headers.authorization.split(' ')[1];

      const userVerified = jwtUtils.verifyToken(token)

      if (!rolesPermitidos.includes(userVerified.idRol)) {
        logger.error(`Unauthorized role to this route, user's petition role: `, req.user.idRol)
        throw new AppError('Rol no autorizado', HttpStatusCode.FORBIDDEN)
      }
      next();
    };
  }


  export default RoleAuthorization;