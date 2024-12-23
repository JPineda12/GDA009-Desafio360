import { Router } from 'express';
import ProductController from '../controllers/product.controller.js';
import validate from '../middlewares/validate.js';
import ProductDto from '../dto/product.dto.js';

const router = Router();

router.get('/list', ProductController.getProductsList);
router.get('/:idProducto', validate(ProductDto.productByIdDto), ProductController.getProductById);
router.post('/', validate(ProductDto.productCreateDto), ProductController.createProduct);
router.put('/:idProducto', validate(ProductDto.productUpdateDto), ProductController.updateProduct);
router.delete('/:idProducto', validate(ProductDto.productDeleteDto), ProductController.inactivateProduct);


const ProductRoutes = {
    router
};

export default ProductRoutes;
