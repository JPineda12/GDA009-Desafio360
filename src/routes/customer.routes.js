import { Router } from 'express';
import CustomerController from '../controllers/customer.controller.js';
import validate from '../middlewares/validate.js';
import CustomerDto from '../dto/customer.dto.js';

const router = Router();

router.get('/list', CustomerController.getCustomersList);
router.get('/:idCliente', validate(CustomerDto.customerByIdDto), CustomerController.getCustomerById);
router.post('/', validate(CustomerDto.customerCreateDto), CustomerController.createCustomer);
router.put('/:idCliente', validate(CustomerDto.customerUpdateDto), CustomerController.updateCustomer);
router.delete('/:idCliente', validate(CustomerDto.customerDeleteDto), CustomerController.inactivateCustomer);


const CustomerRoutes = {
    router
};

export default CustomerRoutes;
