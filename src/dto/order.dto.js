import { body, param } from 'express-validator';

const orderCreateDto = [
  body('usuario_idUsuario')
    .isInt()
    .withMessage("El id del cliente debe ser numerico"),
  body('estado_idEstado')
    .isInt()
    .withMessage("El id del cliente debe ser numerico"),
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
    .withMessage('El nombre completo debe ser un string')
    .isLength({ max: 90 })
    .withMessage("El nombre debe ser menor a 90 caracteres"),
  body('direccion')
    .notEmpty()
    .withMessage("La direccion no puede estar vacio")
    .isString()
    .withMessage('La direccion debe ser un string')
    .isLength({ max: 200 })
    .withMessage("La direccion ser menor a 200 caracteres"),
  body('telefono')
    .notEmpty()
    .withMessage("El telefono no puede estar vacio")
    .isString()
    .withMessage('Telefono debe ser un string'),
  body('total_orden')
    .notEmpty()
    .withMessage("El total de la orden no puede estar vacio")
    .isNumeric()
    .withMessage('El total de la orden debe ser numerico'),
  body('detalles')
    .isArray()
    .withMessage('Detalles debe ser un arreglo')
    .custom((value) => {
      if (value.length === 0) {
        throw new Error('Detalles no puede estar vacío');
      }

      value.forEach((item, index) => {
        if (!item.Producto_idProducto || !item.cantidad || !item.precio || !item.subtotal) {
          throw new Error(`El producto en el índice ${index} debe tener Producto_idProducto, cantidad, precio, y subtotal`);
        }

        if (typeof item.cantidad !== 'number' || item.cantidad <= 0) {
          throw new Error(`La cantidad del producto en el índice ${index} debe ser un número mayor a 0`);
        }

        if (typeof item.precio !== 'number' || item.precio <= 0) {
          throw new Error(`El precio del producto en el índice ${index} debe ser un número mayor a 0`);
        }

        if (typeof item.subtotal !== 'number' || item.subtotal <= 0) {
          throw new Error(`El subtotal del producto en el índice ${index} debe ser un número mayor a 0`);
        }
      });

      return true;
    }),
];

const orderUpdateDto = [
  body('id')
    .notEmpty()
    .withMessage('El id de la orden no puede ser vacio')
    .isInt()
    .withMessage('El id de la orden debe ser numerico'),
  body('usuario_idUsuario')
    .isInt()
    .withMessage("El id del cliente debe ser numerico"),
  body('estado_idEstado')
    .isInt()
    .withMessage("El id del cliente debe ser numerico"),
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
    .withMessage('El nombre completo debe ser un string')
    .isLength({ max: 90 })
    .withMessage("El nombre debe ser menor a 90 caracteres"),
  body('direccion')
    .notEmpty()
    .withMessage("La direccion no puede estar vacio")
    .isString()
    .withMessage('La direccion debe ser un string')
    .isLength({ max: 200 })
    .withMessage("La direccion ser menor a 200 caracteres"),
  body('telefono')
    .notEmpty()
    .withMessage("El telefono no puede estar vacio")
    .isString()
    .withMessage('Telefono debe ser un string'),
  body('total_orden')
    .notEmpty()
    .withMessage("El total de la orden no puede estar vacio")
    .isNumeric()
    .withMessage('El total de la orden debe ser numerico'),
  body('detalles')
    .isArray()
    .withMessage('Detalles debe ser un arreglo')
    .custom((value) => {
      if (value.length === 0) {
        throw new Error('Detalles no puede estar vacío');
      }

      value.forEach((item, index) => {
        if (!item.Producto_idProducto || !item.cantidad || !item.precio || !item.subtotal) {
          throw new Error(`El producto en el índice ${index} debe tener Producto_idProducto, cantidad, precio, y subtotal`);
        }

        if (typeof item.cantidad !== 'number' || item.cantidad <= 0) {
          throw new Error(`La cantidad del producto en el índice ${index} debe ser un número mayor a 0`);
        }

        if (typeof item.precio !== 'number' || item.precio <= 0) {
          throw new Error(`El precio del producto en el índice ${index} debe ser un número mayor a 0`);
        }

        if (typeof item.subtotal !== 'number' || item.subtotal <= 0) {
          throw new Error(`El subtotal del producto en el índice ${index} debe ser un número mayor a 0`);
        }
      });

      return true;
    }),
];

const orderByUserId = [
  param('idUsuario')
    .notEmpty()
    .withMessage('El id del usuario no puede ser vacio')
    .isInt()
    .withMessage('El id del usuario debe ser numerico')
]

const orderById = [
  param('idOrden')
    .notEmpty()
    .withMessage('El id de la orden no puede ser vacio')
    .isInt()
    .withMessage('El id de la orden debe ser numerico')
]


const OrerDto = {
  orderCreateDto, orderUpdateDto, orderByUserId, orderById
};

export default OrerDto