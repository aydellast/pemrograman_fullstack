const db = require('../config/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authController = {
  register: async (req, res) => {
    try {
      const { username, name, email, password } = req.body;
      const finalUsername = username || name;

      if (!finalUsername || !email || !password) {
        return res.status(400).json({
          message: 'Username, email, dan password wajib diisi'
        });
      }

      const checkQuery = 'SELECT * FROM users WHERE email = ?';

      db.query(checkQuery, [email], async (err, results) => {
        if (err) {
          return res.status(500).json({
            message: 'Gagal mengecek email',
            error: err.message
          });
        }

        if (results.length > 0) {
          return res.status(400).json({
            message: 'Email sudah terdaftar'
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertQuery =
          'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

        db.query(
          insertQuery,
          [finalUsername, email, hashedPassword],
          (err, result) => {
            if (err) {
              return res.status(500).json({
                message: 'Register gagal',
                error: err.message
              });
            }

            res.status(201).json({
              message: 'Register berhasil',
              data: {
                id_user: result.insertId,
                username: finalUsername,
                email
              }
            });
          }
        );
      });
    } catch (error) {
      res.status(500).json({
        message: 'Register gagal',
        error: error.message
      });
    }
  },

  login: (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: 'Email dan password wajib diisi'
        });
      }

      const query = 'SELECT * FROM users WHERE email = ?';

      db.query(query, [email], async (err, results) => {
        if (err) {
          return res.status(500).json({
            message: 'Login gagal',
            error: err.message
          });
        }

        if (results.length === 0) {
          return res.status(401).json({
            message: 'Email atau password salah'
          });
        }

        const user = results[0];
        
        let isPasswordValid = false;

        if (user.password && user.password.startsWith('$2b$')) {
          isPasswordValid = await bcrypt.compare(password, user.password);
        } else {
          isPasswordValid = user.password === password;
        }

        console.log("USER DB:", user.email);
console.log("INPUT PASSWORD:", password);
console.log("DB PASSWORD:", user.password);

if (user.password && user.password.startsWith('$2b$')) {
  console.log("MODE: BCRYPT");
  isPasswordValid = await bcrypt.compare(password, user.password);
} else {
  console.log("MODE: PLAINTEXT");
  isPasswordValid = user.password === password;
}

console.log("VALID?", isPasswordValid);

        if (!isPasswordValid) {
          return res.status(401).json({
            message: 'Email atau password salah'
          });
        }

        const token = jwt.sign(
          {
            id: user.id_user,
            id_user: user.id_user,
            email: user.email
          },
          process.env.JWT_SECRET || 'RAHASIA_TOKEN',
          {
            expiresIn: '1h'
          }
        );

        res.status(200).json({
          message: 'Login berhasil',
          token,
          user: {
            id_user: user.id_user,
            username: user.username,
            email: user.email
          }
        });
      });
    } catch (error) {
      res.status(500).json({
        message: 'Login gagal',
        error: error.message
      });
    }
  }
};

module.exports = authController;