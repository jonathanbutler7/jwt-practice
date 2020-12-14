const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = new express();
const passport = require('passport');
const cors = require('cors');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const parser = require('body-parser');
const knex = require('knex');
const knexDb = knex({
  client: 'pg',
  connection: 'postgresql://postgres@localhost/jwt_test',
});
const bookshelf = require('bookshelf');
const securePassword = require('bookshelf-secure-password');
const db = bookshelf(knexDb);
db.plugin(securePassword);
const jwt = require('jsonwebtoken');
const User = db.Model.extend({
  tableName: 'login_user',
  hasSecurePassword: true,
});

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY,
};

const strategy = new JwtStrategy(opts, (payload, next) => {
  // todo: get user from db
  const user = User.forge({ id: payload.id })
    .fetch()
    .then((res) => {
      next(null, user);
    });
});
app.use(cors());
passport.use(strategy);
app.use(passport.initialize());
app.use(
  parser.urlencoded({
    extended: false,
  })
);
app.use(parser.json());
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('sup');
});

app.post('/seedUser', (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.state(401).send('no fields');
  }
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  user.save().then(() => {
    res.send('ok');
  });
});

app.post('/getToken', (req, res) => {
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

app.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send("i'm protected");
  }
);

app.get(
  '/getUser',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    console.log(req.user);
    res.send(req.user);
  }
);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
