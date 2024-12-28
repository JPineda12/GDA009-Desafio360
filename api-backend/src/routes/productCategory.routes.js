import { Router } from 'express';
import ProductCategoryController from '../controllers/productCategory.controller.js';
import validate from '../middlewares/validate.js';
import ProductCategoryDto from '../dto/productCategory.dto.js';
import RolEnum from '../utils/constants/RolEnum.js';
import RoleAuthorization from '../middlewares/roleAuth.middleware.js';

const router = Router();

router.post('/',
    validate(ProductCategoryDto.productCategoryCreateDto),
    RoleAuthorization(RolEnum.ADMIN, RolEnum.OPERADOR),
    ProductCategoryController.create
);

router.get('/', ProductCategoryController.getCategoriasList);
router.put('/:idCategoria', validate(ProductCategoryDto.productCategoryUpdateDto),
    RoleAuthorization(RolEnum.ADMIN, RolEnum.OPERADOR),
    ProductCategoryController.updateCategoria);
router.delete('/:idCategoria',
    RoleAuthorization(RolEnum.ADMIN, RolEnum.OPERADOR),
    ProductCategoryController.deleteCategoria);

const ProductCategoryRoutes = {
    router
};

export default ProductCategoryRoutes;
