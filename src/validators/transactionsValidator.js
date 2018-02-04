import Joi from 'joi';
import validate from '../utils/validate';

const SCHEMA = {
  remarks: Joi.string()
    .label('Remarks')
    .required()
};

/**
 * Validate create/update user request.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function transactionsValidator(req, res, next) {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}


export { transactionsValidator };
