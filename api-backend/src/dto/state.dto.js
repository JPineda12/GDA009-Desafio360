import { body } from 'express-validator';

const stateCreateDto = [
    body('nombre')
        .notEmpty()
        .withMessage('El nombre no puede ser vacio')
        .isString()
        .withMessage('El nombre tiene que ser un string')
        .isLength({ max: 50 })
        .withMessage("El nombre debe ser menor a 50 caracteres")
]

const StateDto = {
    stateCreateDto
};

export default StateDto