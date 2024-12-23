import CustomerService from '../services/Customer.service.js';
import responseUtils from '../utils/responseUtils.js';
import HttpStatusCode from '../utils/constants/httpStatusCode.js';

const CustomerController = {

  async getCustomerById(req, res, next) {
    try {
      const customerId = req.params.idCliente;
      const result = await CustomerService.getCustomerById(customerId);
      responseUtils.successResponse(res, "", result, HttpStatusCode.OK);
    } catch (error) {
      next(error);
    }
  },

  async getCustomersList(_, res, next) {
    try {
      const result = await CustomerService.getCustomerList();
      responseUtils.successResponse(res, "", result, HttpStatusCode.OK);
    } catch (error) {
      next(error);
    }
  },

  async createCustomer(req, res, next) {
    try {
      const customerData = req.body;
      const result = await CustomerService.createCustomer(customerData);
      responseUtils.successResponse(res, 'customer created succesfully', result)
    } catch (error) {
      next(error);
    }
  },

  async updateCustomer(req, res, next) {
    try {
      const customerId = req.params.idCliente
      const customerUpdate = req.body;
      const result = await CustomerService.updateCustomer(customerId, customerUpdate);
      responseUtils.successResponse(res, 'Customer updated successfully', result, HttpStatusCode.OK)
    } catch (error) {
      next(error)
    }
  },

  async inactivateCustomer(req, res, next){
    try {
      const customerId = req.params.idCliente
      const result = await CustomerService.deleteCustomer(customerId);
      responseUtils.successResponse(res, 'Customer deleted successfully', result, HttpStatusCode.OK)
    } catch (error) {
      next(error)
    }
  }
};

export default CustomerController;