import Boom from 'boom';
import knex from 'knex';
import uuid from 'uuid/v4';
import Transaction from '../models/transactionsModel';

/**
 * Get all transaction.
 *
 * @return {Promise}
 */
export function getAllTransaction() {
  return Transaction.fetchAll();
}


/**
 * Create new transaction.
 *
 * @param  {Object}  user
 * @return {Promise}
 */
export function createTransaction(data) {
  return new Transaction({id: uuid(), remarks: data.remarks, updated_at: new Date() }).save(null, {method: 'insert'}).then(transaction => transaction.refresh());
}

