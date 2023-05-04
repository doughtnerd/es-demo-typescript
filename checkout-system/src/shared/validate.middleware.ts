import {RequestHandler} from 'express';
import * as types from 'pheno';

export function validateRequest(
  requestPart: 'body' | 'params' | 'query', 
  validator: types.TypeValidator<any>
): RequestHandler {

  return (req, res, next) => {
    try {
      types.assertType(req[requestPart], validator)
      next();
    } catch (err) {
      return res.status(422).json({ validationError: (err as Error).message });
    }
  }
}
