import ProductCategoryService from "../services/productCategory.service.js";
import responseUtils from '../utils/responseUtils.js';
import HttpStatusCode from '../utils/constants/httpStatusCode.js';

const ProductCategoryController = {
    async create(req, res, next) {
        try {
            const userCreatorid = req.user.id
            const result = await ProductCategoryService.createProductCategory(req.body, userCreatorid);
            responseUtils.successResponse(res, "", result, HttpStatusCode.OK);
        } catch (error) {
            next(error);
        }
    },

    async getCategoriasList(_, res, next) {
        try {
            const result = await ProductCategoryService.getCategoriesList();
            responseUtils.successResponse(res, "", result, HttpStatusCode.OK);
        } catch (error) {
            next(error);
        }
    },

    async updateCategoria(req, res, next) {
        try {
            const userCreatorid = req.user.id
            const categoriaId = req.params.idCategoria
            const result = await ProductCategoryService.updateProductCategory(categoriaId, req.body, userCreatorid);
            responseUtils.successResponse(res, "", result, HttpStatusCode.OK);
        } catch (error) {
            next(error);
        }
    },

    async deleteCategoria(req, res, next) {
        try {
            const categoriaId = req.params.idCategoria
            const result = await ProductCategoryService.deleteCategory(categoriaId);
            responseUtils.successResponse(res, "", result, HttpStatusCode.OK);
        } catch (error) {
            next(error);
        }
    },

};

export default ProductCategoryController;