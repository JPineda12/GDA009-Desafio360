import { Router } from 'express';
import OrderController from '../controllers/order.controller.js'
import validate from '../middlewares/validate.js';
import OrderDto from '../dto/order.dto.js';

const router = Router();

router.get('/list', OrderController.getOrdersList);
router.get('/:idOrden', validate(OrderDto.orderById), OrderController.getOrderById);
router.get('/user/:idUsuario', validate(OrderDto.orderByUserId), OrderController.getOrdersListByUserId);
router.post('/', validate(OrderDto.orderCreateDto), OrderController.createOrder);
router.put('/', validate(OrderDto.orderUpdateDto), OrderController.updateOrder);
router.get('/:idOrden/detail', validate(OrderDto.orderById), OrderController.getOrderDetail);
router.put('/deliver/:idOrden', validate(OrderDto.orderById), OrderController.setDeliveredOrder);


const OrderRoutes = {
    router
};

export default OrderRoutes;
