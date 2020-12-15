const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = new express();
const cors = require('cors');
const parser = require('body-parser');
const routes = require('./routes/index');
const passport = require('./config/passport')
app.use(cors());
app.use(parser.json());
app.use(passport.initialize());
app.use(
  parser.urlencoded({
    extended: false,
  })
);

app.use(routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
