const db = require('../config/database');

exports.findByEmail = async (email) => {
  const [rows] = await db.promise().query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows; 
};

exports.create = async (userData) => {
  const { username, email, password } = userData;
  const [result] = await db.promise().query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password]
  );
  return result;
};


exports.getUserById = async (id) => {
  // Ditambahkan profile_picture agar fotonya bisa ditarik ke frontend
  const [rows] = await db.promise().query(
    'SELECT id_user, username, email, profile_picture FROM users WHERE id_user = ?',
    [id]
  );
  return rows;
};

exports.updateUser = async (id, data) => {
  const { username, email, password, profile_picture } = data;

  // Kalau user upload foto, update beserta fotonya
  if (profile_picture) {
    await db.promise().query(
      'UPDATE users SET username = ?, email = ?, password = ?, profile_picture = ? WHERE id_user = ?',
      [username, email, password, profile_picture, id]
    );
  } else {
    // Kalau nggak upload foto, update data teksnya saja
    await db.promise().query(
      'UPDATE users SET username = ?, email = ?, password = ? WHERE id_user = ?',
      [username, email, password, id]
    );
  }
};