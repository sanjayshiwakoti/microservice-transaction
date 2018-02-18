import knexJs from 'knex';
import knexConfig from './knexfile';
import bookshelfJs from 'bookshelf';

/**
 * Database connection.
 */
const knex = knexJs(knexConfig);
knex.table = table => {
  return knex.withSchema(process.env.DB_SCHEMA).table(table);
};
const bookshelf = bookshelfJs(knex);

bookshelf.plugin(['virtuals', 'pagination', 'visibility', 'bookshelf-camelcase']);

export default bookshelf;
