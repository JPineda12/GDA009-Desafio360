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
  body('idCliente')
    .optional()
    .isInt()
    .withMessage("El id del cliente debe ser numerico")
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
  body('idCliente')
    .optional()
    .isInt()
    .withMessage("El id del cliente debe ser numerico")
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