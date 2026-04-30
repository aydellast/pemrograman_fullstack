const db = require('../config/database');

// ambil profil user
exports.getUserById = async (id) => {
  const [rows] = await db.promise().query(
    'SELECT id_user, username, email FROM users WHERE id_user = ?',
    [id]
  );
  return [rows];
};

// update profil user
exports.updateUser = async (id, data) => {
  const { username, email, password } = data;

  await db.promise().query(
    'UPDATE users SET username = ?, email = ?, password = ? WHERE id_user = ?',
    [username, email, password, id]
  );
};