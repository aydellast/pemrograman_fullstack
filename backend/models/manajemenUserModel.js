const db = require('../config/database');

// ==============================
// LOGIN
// ==============================
exports.findByEmail = async (email) => {
  const [rows] = await db.promise().query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  return rows;
};

// ==============================
// REGISTER
// ==============================
exports.create = async (userData) => {

  const { username, email, password } = userData;

  const [result] = await db.promise().query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password]
  );

  return result;
};

// ==============================
// GET PROFILE
// ==============================
exports.getUserById = async (id) => {

  const [rows] = await db.promise().query(
    'SELECT id_user, username, email, profile_picture FROM users WHERE id_user = ?',
    [id]
  );

  return rows;
};

// ==============================
// UPDATE PROFILE
// ==============================
exports.updateUser = async (id, data) => {

  const {
    username,
    email,
    password,
    profile_picture
  } = data;

  // kalau upload foto
  if (profile_picture) {

    await db.promise().query(
      `UPDATE users
       SET username = ?, email = ?, password = ?, profile_picture = ?
       WHERE id_user = ?`,
      [username, email, password, profile_picture, id]
    );

  } else {

    // kalau tidak upload foto
    await db.promise().query(
      `UPDATE users
       SET username = ?, email = ?, password = ?
       WHERE id_user = ?`,
      [username, email, password, id]
    );
  }
};