const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = new express();

const cors = require('cors');

const parser = require('body-parser');
const loginRouter = require('./login-router');

app.use(cors());
app.use(
  parser.urlencoded({
    extended: false,
  })
);
app.use(parser.json());
const PORT = process.env.PORT || 5000;
app.use('/login', loginRouter);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
