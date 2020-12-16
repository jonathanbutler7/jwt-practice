const express = require('express');
const User = require('../../models/user');
const passport = require('../../config/passport');
const loginRouter = express.Router();
const jwt = require('jsonwebtoken');

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

loginRouter.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send("i'm protected");
  }
);

loginRouter.get(
  '/getUser',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    res.send(req.user);
  }
);

module.exports = loginRouter;
