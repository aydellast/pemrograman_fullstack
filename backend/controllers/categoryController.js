const Category = require("../models/categoryModel");

const allowedTypes = ["Income", "Expense"];

const getUserId = (req) => {
  return req.user?.id_user || req.user?.id;
};

exports.createCategory = (req, res) => {
  const id_user = getUserId(req);
  const { name, type } = req.body;

  if (!id_user) {
    return res.status(401).json({
      message: "User tidak terdeteksi. Silakan login ulang.",
    });
  }

  if (!name || !type) {
    return res.status(400).json({
      message: "name dan type wajib diisi",
    });
  }

  if (!allowedTypes.includes(type)) {
    return res.status(400).json({
      message: "type harus Income atau Expense",
    });
  }

  Category.create(
    {
      id_user,
      name,
      type,
    },
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Gagal membuat kategori",
          error: err.message,
        });
      }

      res.status(201).json({
        message: "Kategori berhasil dibuat",
        data: {
          id_category: result.insertId,
          id_user,
          name,
          type,
        },
      });
    }
  );
};

exports.getAllCategory = (req, res) => {
  const id_user = getUserId(req);

  if (!id_user) {
    return res.status(401).json({
      message: "User tidak terdeteksi. Silakan login ulang.",
    });
  }

  Category.getAllByUser(id_user, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Gagal mengambil kategori",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "Kategori berhasil diambil",
      data: result,
    });
  });
};

exports.getCategoryById = (req, res) => {
  const id_user = getUserId(req);
  const { id } = req.params;

  if (!id_user) {
    return res.status(401).json({
      message: "User tidak terdeteksi. Silakan login ulang.",
    });
  }

  Category.getById(id_user, id, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Gagal mengambil detail kategori",
        error: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Kategori tidak ditemukan atau bukan milik user ini",
      });
    }

    res.status(200).json({
      message: "Detail kategori berhasil diambil",
      data: result[0],
    });
  });
};

exports.updateCategory = (req, res) => {
  const id_user = getUserId(req);
  const { id } = req.params;
  const { name, type } = req.body;

  if (!id_user) {
    return res.status(401).json({
      message: "User tidak terdeteksi. Silakan login ulang.",
    });
  }

  if (!name || !type) {
    return res.status(400).json({
      message: "name dan type wajib diisi",
    });
  }

  if (!allowedTypes.includes(type)) {
    return res.status(400).json({
      message: "type harus Income atau Expense",
    });
  }

  Category.update(id_user, id, { name, type }, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Gagal update kategori",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Kategori tidak ditemukan atau bukan milik user ini",
      });
    }

    res.status(200).json({
      message: "Kategori berhasil diupdate",
    });
  });
};

exports.deleteCategory = (req, res) => {
  const id_user = getUserId(req);
  const { id } = req.params;

  if (!id_user) {
    return res.status(401).json({
      message: "User tidak terdeteksi. Silakan login ulang.",
    });
  }

  Category.delete(id_user, id, (err, result) => {
    if (err) {
      return res.status(500).json({
        message:
          "Gagal menghapus kategori. Kategori mungkin masih dipakai transaksi atau budget.",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Kategori tidak ditemukan atau bukan milik user ini",
      });
    }

    res.status(200).json({
      message: "Kategori berhasil dihapus",
    });
  });
};