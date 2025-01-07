import OrderService from '../services/order.service.js';
import responseUtils from '../utils/responseUtils.js';
import HttpStatusCode from '../utils/constants/httpStatusCode.js';

const OrderController = {

  async getOrderById(req, res, next) {
    try {
      const orderId = req.params.idOrden;
      const result = await OrderService.getOrderById(orderId);
      responseUtils.successResponse(res, "", result, HttpStatusCode.OK);
    } catch (error) {
      next(error);
    }
  },

  async getOrdersListByUserId(req, res, next) {
    try {
      const userId = req.params.idUsuario;
      const result = await OrderService.getOrdersByUserId(userId);
      responseUtils.successResponse(res, "", result, HttpStatusCode.OK);
    } catch (error) {
      next(error);
    }
  },

  async getOrdersList(_, res, next) {
    try {
      const result = await OrderService.getOrdersList();
      responseUtils.successResponse(res, "", result, HttpStatusCode.OK);
    } catch (error) {
      next(error);
    }
  },

  async createOrder(req, res, next) {
    try {
      const orderData = req.body;
      const result = await OrderService.createOrder(orderData);
      responseUtils.successResponse(res, 'Order created succesfully', result)
    } catch (error) {
      next(error);
    }
  },

  async updateOrder(req, res, next) {
    try {
      const orderUpdate = req.body;
      const result = await OrderService.updateOrder(orderUpdate);
      responseUtils.successResponse(res, 'Order updated successfully', result, HttpStatusCode.OK)
    } catch (error) {
      next(error)
    }
  },

  async getOrderDetail(req, res, next) {
    try {
      const orderId = req.params.idOrden;
      const result = await OrderService.getOrderDetail(orderId);
      responseUtils.successResponse(res, "", result, HttpStatusCode.OK);
    } catch (error) {
      next(error);
    }
  },

  async setDeliveredOrder(req, res, next) {
    try {
      const idOrden = req.params.idOrden;
      const result = await OrderService.updateDeliveredOrder(idOrden);
      responseUtils.successResponse(res, 'Order delivered date set successfully', result, HttpStatusCode.OK)
    } catch (error) {
      next(error)
    }
  },

  async setRejectedOrder(req, res, next) {
    try {
      const result = await OrderService.setRejectedOrder(req.body);
      responseUtils.successResponse(res, 'Order rejected date set successfully', result, HttpStatusCode.OK)
    } catch (error) {
      next(error)
    }
  },  
};

export default OrderController;