import { body, param } from 'express-validator';

const customerCreateDto = [
  body('razon_social')
    .notEmpty()
    .withMessage('La razon social no puede ser vacia')
    .isString()
    .withMessage('La razon social debe ser un string')
    .isLength({ max: 245 })
    .withMessage("La razon social debe ser menor a 245 caracteres"),
  body('nombre_comercial')
    .notEmpty()
    .withMessage("El nombre comercial no puede estar vacio")
    .isString()
    .withMessage('El nombre comercial debe ser un string')
    .isLength({ max: 100 })
    .withMessage("El nombre comercial debe ser menor a 100 caracteres"),
  body('direccion_entrega')
    .notEmpty()
    .withMessage("La direccion de entrega no puede estar vacia")
    .isString()
    .withMessage('La direccion de entrega debe ser un string')
    .isLength({ max: 200 })
    .withMessage("La direccion de entrega debe ser menor a 200 caracteres"),
  body('correo_electronico')
    .notEmpty()
    .withMessage('El correo electronico no puede ser vacio')
    .isString()
    .withMessage('El correo tiene que ser un string')
    .isEmail()
    .withMessage("El correo electronico no tiene el formato correcto")
    .isLength({ max: 50 })
    .withMessage("El correo debe ser menor a 50 caracteres"),
];
const customerUpdateDto = [
  param('idCliente')
    .notEmpty()
    .withMessage('El id del cliente no puede ser vacio')
    .isInt()
    .withMessage('El id del cliente debe ser numerico'),
  body('razon_social')
    .notEmpty()
    .withMessage('La razon social no puede ser vacia')
    .isString()
    .withMessage('La razon social debe ser un string')
    .isLength({ max: 245 })
    .withMessage("La razon social debe ser menor a 245 caracteres"),
  body('nombre_comercial')
    .notEmpty()
    .withMessage("El nombre comercial no puede estar vacio")
    .isString()
    .withMessage('El nombre comercial debe ser un string')
    .isLength({ max: 100 })
    .withMessage("El nombre comercial debe ser menor a 100 caracteres"),
  body('direccion_entrega')
    .notEmpty()
    .withMessage("La direccion de entrega no puede estar vacia")
    .isString()
    .withMessage('La direccion de entrega debe ser un string')
    .isLength({ max: 200 })
    .withMessage("La direccion de entrega debe ser menor a 200 caracteres"),
  body('correo_electronico')
    .notEmpty()
    .withMessage('El correo electronico no puede ser vacio')
    .isString()
    .withMessage('El correo tiene que ser un string')
    .isEmail()
    .withMessage("El correo electronico no tiene el formato correcto")
    .isLength({ max: 50 })
    .withMessage("El correo debe ser menor a 50 caracteres"),
];

const customerDeleteDto = [
  param('idCliente')
    .notEmpty()
    .withMessage('El id del cliente no puede ser vacio')
    .isInt()
    .withMessage('El id del cliente debe ser numerico')
]

const customerByIdDto = [
  param('idCliente')
    .notEmpty()
    .withMessage('El id del cliente no puede ser vacio')
    .isInt()
    .withMessage('El id del cliente debe ser numerico')
]


const CustomerDto = {
  customerCreateDto, customerUpdateDto, customerDeleteDto, customerByIdDto
};

export default CustomerDto