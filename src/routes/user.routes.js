import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import validate from '../middlewares/validate.js';
import UserDto from '../dto/user.dto.js';

const router = Router();

router.get('/list', UserController.getUsersList);
router.get('/:idUsuario', validate(UserDto.userByIdDto),UserController.getUserById);
router.post('/', validate(UserDto.userCreateDto), UserController.createUser);
router.put('/:idUsuario', validate(UserDto.userUpdateDto), UserController.updateUser);
router.delete('/:idUsuario', validate(UserDto.userDeleteDto), UserController.inactivateUser);


const UserRoutes = {
    router
};

export default UserRoutes;
