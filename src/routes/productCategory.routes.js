import { Router } from 'express';
import ProductCategoryController from '../controllers/productCategory.controller.js';
import validate from '../middlewares/validate.js';
import ProductCategoryDto from '../dto/productCategory.dto.js';

const router = Router();

router.post('/', validate(ProductCategoryDto.productCategoryCreateDto), ProductCategoryController.create);
router.get('/', ProductCategoryController.getCategoriasList);
router.put('/:idCategoria', validate(ProductCategoryDto.productCategoryUpdateDto), ProductCategoryController.updateCategoria);
router.delete('/:idCategoria', ProductCategoryController.deleteCategoria);

const ProductCategoryRoutes = {
    router
};

export default ProductCategoryRoutes;
