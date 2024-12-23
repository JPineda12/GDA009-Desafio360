import ProductService from '../services/product.service.js';
import responseUtils from '../utils/responseUtils.js';
import HttpStatusCode from '../utils/constants/httpStatusCode.js';

const ProductController = {

  async getProductById(req, res, next) {
    try {
      const userId = req.params.idProducto;
      const result = await ProductService.getProductById(userId);
      responseUtils.successResponse(res, "", result, HttpStatusCode.OK);
    } catch (error) {
      next(error);
    }
  },

  async getProductsList(_, res, next) {
    try {
      const result = await ProductService.getProductsList();
      responseUtils.successResponse(res, "", result, HttpStatusCode.OK);
    } catch (error) {
      next(error);
    }
  },

  async createProduct(req, res, next) {
    try {
      const userCreatorid = req.user.id
      const productData = req.body;
      const result = await ProductService.createProduct(productData, userCreatorid);
      responseUtils.successResponse(res, 'Product created succesfully', result)
    } catch (error) {
      next(error);
    }
  },

  async updateProduct(req, res, next) {
    try {
      const userCreatorid = req.user.id
      const productId = req.params.idProducto
      const productUpdate = req.body;
      const result = await ProductService.updateProduct(productId, productUpdate, userCreatorid);
      responseUtils.successResponse(res, 'Product updated successfully', result, HttpStatusCode.OK)
    } catch (error) {
      next(error)
    }
  },

  async inactivateProduct(req, res, next){
    try {
      const productId = req.params.idProducto
      const result = await ProductService.deleteProduct(productId);
      responseUtils.successResponse(res, 'Product deleted successfully', result, HttpStatusCode.OK)
    } catch (error) {
      next(error)
    }
  }
};

export default ProductController;