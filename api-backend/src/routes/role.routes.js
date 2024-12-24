import { Router } from 'express';
import validate from '../middlewares/validate.js';
import RoleDto from '../dto/role.dto.js';
import RoleController from '../controllers/role.controller.js'

const router = Router();

router.post('/', validate(RoleDto.roleCreateDto), RoleController.create);
router.get('/', RoleController.getRolesList);

const RoleRoutes = {
    router
};

export default RoleRoutes;
