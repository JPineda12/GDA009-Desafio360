import { body, param } from 'express-validator';

const userCreateDto = [
  body('correo_electronico')
    .notEmpty()
    .withMessage('El correo electronico no puede ser vacio')
    .isString()
    .withMessage('El correo tiene que ser un string')
    .isEmail()
    .withMessage("El correo electronico no tiene el formato correcto")
    .isLength({ max: 50 })
    .withMessage("El correo debe ser menor a 50 caracteres"),
  body('nombre_completo')
    .notEmpty()
    .withMessage("El nombre no puede estar vacio")
    .isString()
    .withMessage('El nombre completo debe ser un string'),
    body('idEstado')
    .notEmpty()
    .withMessage('El id del estado no puede ser vacio')
    .isInt()
    .withMessage('El id del estado debe ser numerico'),
    body('idRol')
    .notEmpty()
    .withMessage('El id del rol no puede ser vacio')
    .isInt()
    .withMessage('El id del rol debe ser numerico'),    
  body('password')
    .isLength({ min: 5 })
    .withMessage('Password needs to be longer than 5'),
  body('fecha_nacimiento')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage('El formato de la fecha debe ser YYYY-MM-DD'),
  body('telefono')
    .optional()
    .isString()
    .withMessage('Telefono'),
  body('razon_social')
    .optional()
    .isString()
    .withMessage('La razon social debe ser un string')
    .isLength({ max: 245 })
    .withMessage("La razon social debe ser menor a 245 caracteres"),
  body('nombre_comercial')
    .optional()
    .isString()
    .withMessage('El nombre comercial debe ser un string')
    .isLength({ max: 100 })
    .withMessage("El nombre comercial debe ser menor a 100 caracteres"),
  body('direccion_entrega')
    .optional()
    .isString()
    .withMessage('La direccion de entrega debe ser un string')
    .isLength({ max: 200 })
    .withMessage("La direccion de entrega debe ser menor a 200 caracteres")
];

const userUpdateDto = [
  param('idUsuario')
    .notEmpty()
    .withMessage('El id del usuario no puede ser vacio')
    .isInt()
    .withMessage('El id del usuario debe ser numerico'),
  body('correo_electronico')
    .notEmpty()
    .withMessage('El correo electronico no puede ser vacio')
    .isString()
    .withMessage('El correo tiene que ser un string')
    .isEmail()
    .withMessage("El correo electronico no tiene el formato correcto")
    .isLength({ max: 50 })
    .withMessage("El correo debe ser menor a 50 caracteres"),
  body('nombre_completo')
    .notEmpty()
    .withMessage("El nombre no puede estar vacio")
    .isString()
    .withMessage('El nombre completo debe ser un string'),
  body('password')
    .isLength({ min: 5 })
    .withMessage('Password needs to be longer than 5'),
  body('fecha_nacimiento')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage('El formato de la fecha debe ser YYYY-MM-DD'),
  body('idRol')
    .notEmpty()
    .withMessage('El id del rol no puede ser vacio')
    .isInt()
    .withMessage('El id del rol debe ser numerico'),
  body('idEstado')
    .notEmpty()
    .withMessage('El id del estado no puede ser vacio')
    .isInt()
    .withMessage('El id del estado debe ser numerico'),
  body('telefono')
    .optional()
    .isString()
    .withMessage('Telefono'),
  body('razon_social')
    .optional()
    .isString()
    .withMessage('La razon social debe ser un string')
    .isLength({ max: 245 })
    .withMessage("La razon social debe ser menor a 245 caracteres"),
  body('nombre_comercial')
    .optional()
    .isString()
    .withMessage('El nombre comercial debe ser un string')
    .isLength({ max: 100 })
    .withMessage("El nombre comercial debe ser menor a 100 caracteres"),
  body('direccion_entrega')
    .optional()
    .isString()
    .withMessage('La direccion de entrega debe ser un string')
    .isLength({ max: 200 })
    .withMessage("La direccion de entrega debe ser menor a 200 caracteres")
];

const userDeleteDto = [
  param('idUsuario')
    .notEmpty()
    .withMessage('El id del usuario no puede ser vacio')
    .isInt()
    .withMessage('El id del usuario debe ser numerico')
]

const userByIdDto = [
  param('idUsuario')
    .notEmpty()
    .withMessage('El id del usuario no puede ser vacio')
    .isInt()
    .withMessage('El id del usuario debe ser numerico')
]

const userLogin = [
  body('correo_electronico')
    .notEmpty()
    .withMessage('El correo electronico no puede ser vacio')
    .isString()
    .withMessage('El correo tiene que ser un string')
    .isEmail()
    .withMessage("El correo electronico no tiene el formato correcto")
    .isLength({ max: 50 })
    .withMessage("El correo debe ser menor a 50 caracteres"),
  body('password')
    .isLength({ min: 5 })
    .withMessage('Password needs to be longer than 5'),
]


const UserDto = {
  userCreateDto, userUpdateDto, userDeleteDto, userByIdDto, userLogin
};

export default UserDto