const knex = require('knex');
const securePassword = require('bookshelf-secure-password');
const knexDb = knex({
  client: 'pg',
  connection: 'postgresql://postgres@localhost/jwt_test',
});
const bookshelf = require('bookshelf');
const db = bookshelf(knexDb);
db.plugin(securePassword);

module.exports = db;
