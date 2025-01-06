import { body, param } from 'express-validator';

const productCreateDto = [
    body('nombre')
        .notEmpty()
        .withMessage('El nombre no puede ser vacio')
        .isString()
        .withMessage('El nombre tiene que ser un string')
        .isLength({ max: 90 })
        .withMessage("El nombre debe ser menor a 90 caracteres"),
    body('marca')
        .notEmpty()
        .withMessage('La marca no puede ser vacio')
        .isString()
        .withMessage('La marca tiene que ser un string')
        .isLength({ max: 45 })
        .withMessage("La marca debe ser menor a 45 caracteres"),
    body('codigo')
        .notEmpty()
        .withMessage('El codigo no puede ser vacio')
        .isString()
        .withMessage('El codigo tiene que ser un string')
        .isLength({ max: 45 })
        .withMessage("El codigo debe ser menor a 45  caracteres"),
    body('precio')
        .notEmpty()
        .withMessage('El precio no puede ser vacio')
        .isNumeric()
        .withMessage('El precio tiene que ser numerico'),
    body('imagen_base64')
        .notEmpty()
        .withMessage('La imagen no puede ser vacia')
        .isString()
        .withMessage('La imagen tiene que ser un string')
        .isBase64()
        .withMessage('La imagen debe estar en formato base64'),
    body('idCategoria')
        .optional()
        .isInt()
        .withMessage("El id de la categoria debe ser numerica"),
    body('idEstado')
        .optional()
        .isInt()
        .withMessage("El id del estado debe ser numerico")
]

const productUpdateDto = [
    param('idProducto')
        .notEmpty()
        .withMessage('El id del producto no puede ser vacio')
        .isInt()
        .withMessage('El id del producto debe ser numerico'),
    body('nombre')
        .notEmpty()
        .withMessage('El nombre no puede ser vacio')
        .isString()
        .withMessage('El nombre tiene que ser un string')
        .isLength({ max: 90 })
        .withMessage("El nombre debe ser menor a 90 caracteres"),
    body('marca')
        .notEmpty()
        .withMessage('La marca no puede ser vacio')
        .isString()
        .withMessage('La marca tiene que ser un string')
        .isLength({ max: 45 })
        .withMessage("La marca debe ser menor a 45 caracteres"),
    body('codigo')
        .notEmpty()
        .withMessage('El codigo no puede ser vacio')
        .isString()
        .withMessage('El codigo tiene que ser un string')
        .isLength({ max: 45 })
        .withMessage("El codigo debe ser menor a 45  caracteres"),
    body('precio')
        .notEmpty()
        .withMessage('El precio no puede ser vacio')
        .isNumeric()
        .withMessage('El precio tiene que ser numerico'),
    body('imagen_base64')
        .notEmpty()
        .withMessage('La imagen no puede ser vacia')
        .isString()
        .withMessage('La imagen tiene que ser un string')
        .isBase64()
        .withMessage('La imagen debe estar en formato base64'),
    body('idCategoria')
        .optional()
        .isInt()
        .withMessage("El id de la categoria debe ser numerica"),
    body('idEstado')
        .optional()
        .isInt()
        .withMessage("El id del estado debe ser numerico")
]


const productDeleteDto = [
    param('idProducto')
        .notEmpty()
        .withMessage('El id del producto no puede ser vacio')
        .isInt()
        .withMessage('El id del producto debe ser numerico')
]

const productByIdDto = [
    param('idProducto')
        .notEmpty()
        .withMessage('El id del producto no puede ser vacio')
        .isInt()
        .withMessage('El id del producto debe ser numerico')
]

const ProductDto = {
    productCreateDto, productUpdateDto, productByIdDto, productDeleteDto
};

export default ProductDto