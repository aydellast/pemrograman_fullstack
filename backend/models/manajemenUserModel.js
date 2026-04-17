const db = require('../config/database');

// ambil profil user
exports.getUserById = (id) => {
  return db.promise().query(
    'SELECT id_user, username, email FROM users WHERE id_user = ?',
    [id]
  );
};

// update profil user
exports.updateUser = (id, data) => {
  return db.promise().query(
    'UPDATE users SET username=?, email=?, password=? WHERE id_user=?',
    [data.username, data.email, data.password, id]
  );
};