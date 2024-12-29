import { Router } from 'express';
import OrderController from '../controllers/order.controller.js'
import validate from '../middlewares/validate.js';
import OrderDto from '../dto/order.dto.js';
import RolEnum from '../utils/constants/RolEnum.js';

const router = Router();

router.get('/list',
    RoleAuthorization(RolEnum.ADMIN, RolEnum.OPERADOR),
    OrderController.getOrdersList);
router.get('/:idOrden', validate(OrderDto.orderById),
    RoleAuthorization(RolEnum.ADMIN, RolEnum.OPERADOR, RolEnum.CLIENTE),
    OrderController.getOrderById);
router.get('/user/:idUsuario', validate(OrderDto.orderByUserId),
    RoleAuthorization(RolEnum.ADMIN, RolEnum.OPERADOR, RolEnum.CLIENTE),
    OrderController.getOrdersListByUserId);
router.post('/', validate(OrderDto.orderCreateDto),
    RoleAuthorization(RolEnum.ADMIN, RolEnum.OPERADOR, RolEnum.CLIENTE),
    OrderController.createOrder);
router.put('/', validate(OrderDto.orderUpdateDto),
    RoleAuthorization(RolEnum.ADMIN, RolEnum.OPERADOR),
    OrderController.updateOrder);
router.get('/:idOrden/detail', validate(OrderDto.orderById),
    RoleAuthorization(RolEnum.ADMIN, RolEnum.OPERADOR, RolEnum.CLIENTE),
    OrderController.getOrderDetail);
router.put('/deliver/:idOrden', validate(OrderDto.orderById),
    RoleAuthorization(RolEnum.ADMIN, RolEnum.OPERADOR),
    OrderController.setDeliveredOrder);


const OrderRoutes = {
    router
};

export default OrderRoutes;
