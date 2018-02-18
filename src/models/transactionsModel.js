import bookshelf from '../db';

const TABLE_NAME = 'transaction_aggregate';

/**
 * User model.
 */
class Transaction extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }
}

export default Transaction;
