const getAllUsers = (req, res) => {
    res.json({ message: "Menampilkan semua data pengguna CuppyCash" });
};

const register = (req, res) => {
    res.json({ message: "Register berhasil" });
};

const login = (req, res) => {
    res.json({ message: "Login berhasil" });
};

module.exports = {
    getAllUsers,
    register,
    login
};