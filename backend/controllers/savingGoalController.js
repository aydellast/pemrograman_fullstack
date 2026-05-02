const savingGoalModel = require("../models/savingGoalModel");

// ✅ GET GOALS
const getGoals = (req, res) => {
  try {
    if (!req.user || !req.user.id_user) {
      return res.status(401).json({
        message: "User tidak valid / belum login",
      });
    }

    const userId = req.user.id_user;

    savingGoalModel.getGoals(userId, (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Error",
          error: err.message,
        });
      }

      res.status(200).json({
        message: "Data goals",
        data: results,
      });
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ✅ CREATE GOAL (SUDAH PUNYA KAMU)
const createGoal = (req, res) => {
  try {
    if (!req.user || !req.user.id_user) {
      return res.status(401).json({
        message: "User tidak valid / belum login",
      });
    }

    const userId = req.user.id_user;

    const { goal_name, target_amount, target_date } = req.body;

    const image_url = req.file ? req.file.filename : "default-goal.png";

    if (!goal_name || !target_amount || !target_date) {
      return res.status(400).json({
        message: "Semua field wajib diisi",
      });
    }

    if (isNaN(target_amount)) {
      return res.status(400).json({
        message: "Target amount harus angka",
      });
    }

    if (Number(target_amount) <= 0) {
      return res.status(400).json({
        message: "Target amount harus lebih dari 0",
      });
    }

    const data = [userId, goal_name, target_amount, target_date, image_url];

    savingGoalModel.createGoal(data, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Gagal buat goal",
          error: err.message,
        });
      }

      res.status(201).json({
        message: "Goal berhasil dibuat 🎯",
        data: {
          id_goal: result.insertId,
          image_url: image_url
        },
      });
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ✅ ADD CONTRIBUTION
const addContribution = (req, res) => {
  try {
    if (!req.user || !req.user.id_user) {
      return res.status(401).json({
        message: "User tidak valid / belum login",
      });
    }

    const { id } = req.params;
    const { amount, contribution_date } = req.body;

    if (!amount || !contribution_date) {
      return res.status(400).json({
        message: "Semua field wajib diisi",
      });
    }

    if (isNaN(amount)) {
      return res.status(400).json({
        message: "Amount harus angka",
      });
    }

    const data = [id, amount, contribution_date];

    savingGoalModel.addContribution(data, (err) => {
      if (err) {
        return res.status(500).json({
          message: "Gagal tambah kontribusi",
          error: err.message,
        });
      }

      res.status(201).json({
        message: "Kontribusi berhasil ditambahkan",
      });
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getGoals,
  createGoal,
  addContribution,
};