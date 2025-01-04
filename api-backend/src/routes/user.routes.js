import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import validate from '../middlewares/validate.js';
import UserDto from '../dto/user.dto.js';
import RolEnum from '../utils/constants/RolEnum.js';
import RoleAuthorization from '../middlewares/roleAuth.middleware.js';

const router = Router();

router.get('/list',
    RoleAuthorization(RolEnum.ADMIN, RolEnum.OPERADOR),
    UserController.getUsersList);
router.get('/:idUsuario', validate(UserDto.userByIdDto),
    RoleAuthorization(RolEnum.ADMIN, RolEnum.OPERADOR, RolEnum.CLIENTE),
    UserController.getUserById);
router.post('/', validate(UserDto.userCreateDto),
    RoleAuthorization(RolEnum.ADMIN, RolEnum.OPERADOR),
    UserController.createUser);
router.put('/:idUsuario', validate(UserDto.userUpdateDto),
    RoleAuthorization(RolEnum.ADMIN, RolEnum.OPERADOR, RolEnum.CLIENTE),
    UserController.updateUser);
router.delete('/:idUsuario', validate(UserDto.userDeleteDto),
    RoleAuthorization(RolEnum.ADMIN, RolEnum.OPERADOR, RolEnum.CLIENTE),
    UserController.inactivateUser);


const UserRoutes = {
    router
};

export default UserRoutes;
