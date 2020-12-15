const router = require('express').Router();
const login = require('./login-router')

router.use('/login', login);

module.exports = router;