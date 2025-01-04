import { body, param } from 'express-validator';

const productCategoryCreateDto = [
    body('nombre')
        .notEmpty()
        .withMessage('El nombre no puede ser vacio')
        .isString()
        .withMessage('El nombre tiene que ser un string')
        .isLength({ max: 45 })
        .withMessage("El nombre debe ser menor a 45 caracteres"),
    body('idEstado')
        .notEmpty()
        .withMessage('El id del estado no puede ser vacio')
        .isInt()
        .withMessage('El id del estado debe ser numerico'),
]

const productCategoryUpdateDto = [
    param('idCategoria')
        .notEmpty()
        .withMessage('El id de la categoria no puede ser vacio')
        .isInt()
        .withMessage('El id de la categoria debe ser numerica'),
    body('nombre')
        .notEmpty()
        .withMessage('El nombre no puede ser vacio')
        .isString()
        .withMessage('El nombre tiene que ser un string')
        .isLength({ max: 45 })
        .withMessage("El nombre debe ser menor a 45 caracteres"),
    body('idEstado')
        .notEmpty()
        .withMessage('El id del estado no puede ser vacio')
        .isInt()
        .withMessage('El id del estado debe ser numerico'),
]

const ProductCategoryDto = {
    productCategoryCreateDto, productCategoryUpdateDto
};

export default ProductCategoryDto