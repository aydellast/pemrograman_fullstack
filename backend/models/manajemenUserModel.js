const db = require('../config/database');

// ambil profil user
exports.getUserById = async (id) => {
  const [rows] = await db.promise().query(
    'SELECT id_user, username, email, profile_picture FROM users WHERE id_user = ?',
    [id]
  );
  return [rows];
};

// update profil user
exports.updateUser = async (id, data) => {
  const { username, email, password, profile_picture } = data;

  // kalau ada foto → update semua
  if (profile_picture) {
    await db.promise().query(
      `UPDATE users 
       SET username = ?, email = ?, password = ?, profile_picture = ?
       WHERE id_user = ?`,
      [username, email, password, profile_picture, id]
    );
  } else {
    // kalau tidak ada foto → jangan ubah foto lama
    await db.promise().query(
      `UPDATE users 
       SET username = ?, email = ?, password = ?
       WHERE id_user = ?`,
      [username, email, password, id]
    );
  }
};