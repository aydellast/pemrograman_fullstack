const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Auth = require("../models/authModel");

const JWT_SECRET = process.env.JWT_SECRET || "RAHASIA_TOKEN";

const isBcryptHash = (password) => {
  return typeof password === "string" && password.startsWith("$2");
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePasswordStrength = (password, username, email) => {
  const errors = [];

  if (password.length < 8) {
    errors.push("Password minimal 8 karakter.");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password harus memiliki minimal 1 huruf besar.");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password harus memiliki minimal 1 huruf kecil.");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Password harus memiliki minimal 1 angka.");
  }

  if (!/[!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`]/.test(password)) {
    errors.push("Password harus memiliki minimal 1 simbol.");
  }

  if (/\s/.test(password)) {
    errors.push("Password tidak boleh mengandung spasi.");
  }

  const lowerPassword = password.toLowerCase();
  const lowerUsername = String(username || "").toLowerCase();
  const emailName = String(email || "").split("@")[0].toLowerCase();

  if (lowerUsername && lowerPassword.includes(lowerUsername)) {
    errors.push("Password tidak boleh mengandung username.");
  }

  if (emailName && lowerPassword.includes(emailName)) {
    errors.push("Password tidak boleh mengandung nama email.");
  }

  return errors;
};

const authController = {
  register: async (req, res) => {
    try {
      const { username, name, email, password } = req.body;

      const finalUsername = String(username || name || "").trim();
      const finalEmail = String(email || "").trim().toLowerCase();
      const finalPassword = String(password || "");

      if (!finalUsername || !finalEmail || !finalPassword) {
        return res.status(400).json({
          message: "Username, email, dan password wajib diisi.",
        });
      }

      if (finalUsername.length < 3) {
        return res.status(400).json({
          message: "Username minimal 3 karakter.",
        });
      }

      if (!validateEmail(finalEmail)) {
        return res.status(400).json({
          message: "Format email tidak valid.",
        });
      }

      const passwordErrors = validatePasswordStrength(
        finalPassword,
        finalUsername,
        finalEmail
      );

      if (passwordErrors.length > 0) {
        return res.status(400).json({
          message: "Password belum memenuhi syarat keamanan.",
          errors: passwordErrors,
        });
      }

      const existingUser = await Auth.findByEmail(finalEmail);

      if (existingUser.length > 0) {
        return res.status(400).json({
          message: "Email sudah terdaftar.",
        });
      }

      const hashedPassword = await bcrypt.hash(finalPassword, 12);

      const result = await Auth.createUser({
        username: finalUsername,
        email: finalEmail,
        password: hashedPassword,
      });

      res.status(201).json({
        message: "Register berhasil. Silakan login.",
        data: {
          id_user: result.insertId,
          username: finalUsername,
          email: finalEmail,
        },
      });
    } catch (error) {
      console.error("REGISTER ERROR:", error);

      res.status(500).json({
        message: "Register gagal.",
        error: error.message,
      });
    }
  },

  login: async (req, res) => {
    try {
      const finalEmail = String(req.body.email || "").trim().toLowerCase();
      const finalPassword = String(req.body.password || "");

      if (!finalEmail || !finalPassword) {
        return res.status(400).json({
          message: "Email dan password wajib diisi.",
        });
      }

      const results = await Auth.findByEmail(finalEmail);

      if (results.length === 0) {
        return res.status(401).json({
          message: "Email atau password salah.",
        });
      }

      const user = results[0];

      let isPasswordValid = false;

      if (isBcryptHash(user.password)) {
        isPasswordValid = await bcrypt.compare(finalPassword, user.password);
      } else {
        // Kompatibilitas untuk akun lama yang password-nya masih plaintext.
        isPasswordValid = user.password === finalPassword;

        // Kalau akun lama berhasil login, password langsung diamankan ulang.
        if (isPasswordValid) {
          const newHashedPassword = await bcrypt.hash(finalPassword, 12);
          await Auth.updatePassword(user.id_user, newHashedPassword);
        }
      }

      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Email atau password salah.",
        });
      }

      const token = jwt.sign(
        {
          id: user.id_user,
          id_user: user.id_user,
          email: user.email,
          role: user.role || "User",
        },
        JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({
        message: "Login berhasil.",
        token,
        user: {
          id_user: user.id_user,
          username: user.username,
          email: user.email,
          role: user.role || "User",
        },
      });
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      res.status(500).json({
        message: "Login gagal.",
        error: error.message,
      });
    }
  },
};

module.exports = authController;