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
const loginRouter = require('./login-router');


const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY,
};

const strategy = new JwtStrategy(opts, (payload, next) => {
  // todo: get user from db
  const user = User.forge({ id: payload.id })
    .fetch()
    .then((user) => {
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
app.use('/login', loginRouter);



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
