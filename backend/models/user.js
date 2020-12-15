const db = require('../database/index');

const User = db.Model.extend({
  tableName: 'login_user',
  hasSecurePassword: true,
});

module.exports = User;
