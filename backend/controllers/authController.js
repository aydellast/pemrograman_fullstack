const jwt = require('jsonwebtoken');

const authController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // mengecek email & password ke database
            if (email === "admin@example.com" && password === "password123") {
                const token = jwt.sign({ id: 1, email: email }, 'RAHASIA_TOKEN', { expiresIn: '1h' });
                return res.status(200).json({
                    message: "Login berhasil! 🔑",
                    token: token
                });
            } else {
                return res.status(401).json({ message: "Email atau password salah!" });
            }
        } catch (error) {
            res.status(500).json({ message: "Gagal login", error: error.message });
        }
    }
};

module.exports = authController;