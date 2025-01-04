import { Router } from 'express';
import validate from '../middlewares/validate.js';
import RoleDto from '../dto/role.dto.js';
import RoleController from '../controllers/role.controller.js'
import RoleAuthorization from '../middlewares/roleAuth.middleware.js';
import RolEnum from '../utils/constants/RolEnum.js';
const router = Router();

router.post('/', validate(RoleDto.roleCreateDto),
    RoleAuthorization(RolEnum.ADMIN),
    RoleController.create);
router.get('/', 
    RoleAuthorization(RolEnum.ADMIN, RolEnum.OPERADOR),
    RoleController.getRolesList);

const RoleRoutes = {
    router
};

export default RoleRoutes;
