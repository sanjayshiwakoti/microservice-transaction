import { Router } from 'express';
import * as transactionsService from '../services/transactionsService';
import { transactionsValidator } from '../validators/transactionsValidator';

const router = Router();

/**
 * POST /api/transactions
 */
router.post('/', transactionsValidator, (req, res, next) => {
  transactionsService
    .createTransaction(req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

export default router;
