const express = require('express');
const loginRouter = express.Router();
const bookshelf = require('bookshelf');
const knex = require('knex');
const jwt = require('jsonwebtoken');
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

loginRouter.post('/getToken', (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(401).send('Fields not sent');
  }

  User.forge({ email: req.body.email })
    .fetch()
    .then((result) => {
      if (!result) {
        return res.status(400).send('user not found');
      }
      result
        .authenticate(req.body.password)
        .then((user) => {
          const payload = { id: user.id };
          const token = jwt.sign(payload, process.env.SECRET_OR_KEY);
          res.send(token);
        })
        .catch((err) => {
          return res.status(401).send(err);
        });
    });
});

module.exports = loginRouter;
