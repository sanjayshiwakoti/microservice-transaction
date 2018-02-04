import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as transactionsService from '../services/transactionsService';

const router = Router();

/**
 * POST /api/transactions
 */
router.post('/', (req, res, next) => {
  transactionsService
    .createTransaction(req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});


export default router;
