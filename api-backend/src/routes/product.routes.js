import { Router } from 'express';
import ProductController from '../controllers/product.controller.js';
import validate from '../middlewares/validate.js';
import ProductDto from '../dto/product.dto.js';
import RolEnum from '../utils/constants/RolEnum.js';

const router = Router();

router.get('/list',
    RoleAuthorization(RolEnum.ADMIN, RolEnum.OPERADOR, RolEnum.CLIENTE),
    ProductController.getProductsList);
router.get('/:idProducto', validate(ProductDto.productByIdDto),
    RoleAuthorization(RolEnum.ADMIN, RolEnum.OPERADOR, RolEnum.CLIENTE),
    ProductController.getProductById);
router.post('/', validate(ProductDto.productCreateDto),
    RoleAuthorization(RolEnum.ADMIN, RolEnum.OPERADOR),
    ProductController.createProduct);
router.put('/:idProducto', validate(ProductDto.productUpdateDto),
    RoleAuthorization(RolEnum.ADMIN, RolEnum.OPERADOR),
    ProductController.updateProduct);
router.delete('/:idProducto', validate(ProductDto.productDeleteDto),
    RoleAuthorization(RolEnum.ADMIN, RolEnum.OPERADOR),
    ProductController.inactivateProduct);


const ProductRoutes = {
    router
};

export default ProductRoutes;
