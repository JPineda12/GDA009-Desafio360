import { Router } from 'express';
import validate from '../middlewares/validate.js';
import StateDto from '../dto/state.dto.js';
import StateController from '../controllers/state.controller.js'

const router = Router();

router.post('/', validate(StateDto.stateCreateDto),
    RoleAuthorization(RolEnum.ADMIN),
    StateController.create);
router.get('/',
    RoleAuthorization(RolEnum.ADMIN, RolEnum.OPERADOR),
    StateController.getStatesList);

const StateRoutes = {
    router
};

export default StateRoutes;
