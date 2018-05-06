import Boom from 'boom';

/**
 * Validate the API Gateway request
 *
 * @param {Object} req
 * @param {Object} res
 */
export function validApiGateway(req, res, next) {
  if (req.headers && req.headers['x-request-id'] && req.headers['x-request-id'] === process.env.MSA_TRANSACTION_KEY) {
    next();
  } else {
    throw new Boom.unauthorized('Not a valid gateway');
  }
}
