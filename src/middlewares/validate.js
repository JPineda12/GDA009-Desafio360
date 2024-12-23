import { validationResult } from 'express-validator';
import HttpStatusCode from '../utils/constants/httpStatusCode.js';

export default (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
  }
  next();
};
