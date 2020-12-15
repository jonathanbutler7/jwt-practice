const express = require('express');
const loginRouter = express.Router();
const bookshelf = require('bookshelf');
const knex = require('knex');
const knexDb = knex({
  client: 'pg',
  connection: 'postgresql://postgres@localhost/jwt_test',
});
const db = bookshelf(knexDb);
const securePassword = require('bookshelf-secure-password');
db.plugin(securePassword);
const User = db.Model.extend({
    tableName: 'login_user',
    hasSecurePassword: true,
  });

loginRouter.get('/', (req, res) => {
  res.send('sup');
});

loginRouter.post('/seedUser', (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.state(401).send('no fields');
  }
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  user.save().then(() => {
    res.send(user);
  });
});

module.exports = loginRouter;
