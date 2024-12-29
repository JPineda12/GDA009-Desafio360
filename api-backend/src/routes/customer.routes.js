import { Router } from 'express';
import CustomerController from '../controllers/customer.controller.js';
import validate from '../middlewares/validate.js';
import CustomerDto from '../dto/customer.dto.js';
import RolEnum from '../utils/constants/RolEnum.js';

const router = Router();

router.get('/list',
    RoleAuthorization(RolEnum.ADMIN, RolEnum.OPERADOR),
    CustomerController.getCustomersList);
router.get('/:idCliente', validate(CustomerDto.customerByIdDto),
    RoleAuthorization(RolEnum.ADMIN, RolEnum.OPERADOR,  RolEnum.CLIENTE),
    CustomerController.getCustomerById);
router.post('/', validate(CustomerDto.customerCreateDto),
    RoleAuthorization(RolEnum.ADMIN, RolEnum.OPERADOR, RolEnum.CLIENTE),
    CustomerController.createCustomer);
router.put('/:idCliente', validate(CustomerDto.customerUpdateDto),
    RoleAuthorization(RolEnum.ADMIN, RolEnum.OPERADOR, RolEnum.CLIENTE),
    CustomerController.updateCustomer);
router.delete('/:idCliente', validate(CustomerDto.customerDeleteDto),
    RoleAuthorization(RolEnum.ADMIN, RolEnum.OPERADOR),
    CustomerController.inactivateCustomer);


const CustomerRoutes = {
    router
};

export default CustomerRoutes;
