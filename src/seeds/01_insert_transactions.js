import uuid from 'uuid/v4';
/**
 * Seed users table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('transaction_aggregate').then(() => {
    return Promise.all([
      // Inserts seed entries
      knex('transaction_aggregate').insert([
        {
          id: uuid(),
          remarks: 'test',
          created_at: new Date(),
          updated_at: new Date()
        }
      ])
    ]);
  });
}
