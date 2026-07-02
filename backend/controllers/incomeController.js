const Income = require("../models/incomeModel");

const getUserId = (req) => {
  return req.user?.id_user || req.user?.id;
};

const addIncome = (req, res) => {
  const id_user = getUserId(req);

  const {
    amount,
    id_category,
    transaction_date,
    description,
  } = req.body;

  if (!id_user) {
    return res.status(401).json({
      message: "User tidak terdeteksi. Silakan login ulang.",
    });
  }

  if (!amount || Number(amount) <= 0) {
    return res.status(400).json({
      message: "Amount wajib diisi dan harus lebih dari 0.",
    });
  }

  if (!id_category) {
    return res.status(400).json({
      message: "Kategori wajib dipilih.",
    });
  }

  Income.create(
    {
      id_user,
      id_category,
      amount,
      transaction_date,
      description,
    },
    (err, result) => {
      if (err) {
        console.error("ERROR ADD INCOME:", err);

        return res.status(500).json({
          message: "Gagal menambahkan income",
          error: err.message,
        });
      }

      res.status(201).json({
        message: "Income berhasil ditambahkan",
        data: {
          id_transaction: result.insertId,
          id_user,
          id_category,
          amount,
          transaction_date,
          description,
        },
      });
    }
  );
};

const getAllIncome = (req, res) => {
  const id_user = getUserId(req);

  if (!id_user) {
    return res.status(401).json({
      message: "User tidak terdeteksi. Silakan login ulang.",
    });
  }

  Income.getAllByUser(id_user, (err, results) => {
    if (err) {
      console.error("ERROR GET INCOME:", err);

      return res.status(500).json({
        message: "Gagal mengambil data income",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "Data income berhasil diambil",
      data: results,
    });
  });
};

const getIncomeById = (req, res) => {
  const id_user = getUserId(req);
  const { id } = req.params;

  Income.getById(id_user, id, (err, results) => {
    if (err) {
      console.error("ERROR GET INCOME BY ID:", err);

      return res.status(500).json({
        message: "Gagal mengambil detail income",
        error: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Income tidak ditemukan",
      });
    }

    res.status(200).json({
      message: "Detail income berhasil diambil",
      data: results[0],
    });
  });
};

const updateIncome = (req, res) => {
  const id_user = getUserId(req);
  const { id } = req.params;

  const {
    amount,
    id_category,
    transaction_date,
    description,
  } = req.body;

  if (!amount || Number(amount) <= 0) {
    return res.status(400).json({
      message: "Amount wajib diisi dan harus lebih dari 0.",
    });
  }

  if (!id_category) {
    return res.status(400).json({
      message: "Kategori wajib dipilih.",
    });
  }

  Income.update(
    id_user,
    id,
    {
      amount,
      id_category,
      transaction_date,
      description,
    },
    (err, result) => {
      if (err) {
        console.error("ERROR UPDATE INCOME:", err);

        return res.status(500).json({
          message: "Gagal update income",
          error: err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Income tidak ditemukan atau bukan milik user ini.",
        });
      }

      res.status(200).json({
        message: "Income berhasil diupdate",
      });
    }
  );
};

const deleteIncome = (req, res) => {
  const id_user = getUserId(req);
  const { id } = req.params;

  Income.delete(id_user, id, (err, result) => {
    if (err) {
      console.error("ERROR DELETE INCOME:", err);

      return res.status(500).json({
        message: "Gagal hapus income",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Income tidak ditemukan atau bukan milik user ini.",
      });
    }

    res.status(200).json({
      message: "Income berhasil dihapus",
    });
  });
};

const filterIncomeByDate = (req, res) => {
  const id_user = getUserId(req);
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({
      message: "Query start dan end wajib diisi.",
    });
  }

  Income.filterByDate(id_user, start, end, (err, results) => {
    if (err) {
      console.error("ERROR FILTER INCOME:", err);

      return res.status(500).json({
        message: "Gagal filter income",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "Filter income berhasil",
      data: results,
    });
  });
};

const getTotalIncome = (req, res) => {
  const id_user = getUserId(req);

  Income.getTotalByUser(id_user, (err, results) => {
    if (err) {
      console.error("ERROR TOTAL INCOME:", err);

      return res.status(500).json({
        message: "Gagal mengambil total income",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "Total income berhasil diambil",
      data: results[0],
    });
  });
};

module.exports = {
  addIncome,
  getAllIncome,
  getIncomeById,
  updateIncome,
  deleteIncome,
  filterIncomeByDate,
  getTotalIncome,
};