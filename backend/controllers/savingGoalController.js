const SavingGoal = require("../models/savingGoalModel");

const getUserId = (req) => {
  return req.user?.id_user || req.user?.id;
};

const getGoals = (req, res) => {
  const id_user = getUserId(req);

  if (!id_user) {
    return res.status(401).json({
      message: "User tidak valid atau belum login.",
    });
  }

  SavingGoal.getGoalsByUser(id_user, (err, results) => {
    if (err) {
      console.error("ERROR GET SAVING GOALS:", err);

      return res.status(500).json({
        message: "Gagal mengambil saving goals",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "Data saving goals berhasil diambil",
      data: results,
    });
  });
};

const getGoalById = (req, res) => {
  const id_user = getUserId(req);
  const { id } = req.params;

  if (!id_user) {
    return res.status(401).json({
      message: "User tidak valid atau belum login.",
    });
  }

  SavingGoal.getGoalById(id_user, id, (err, results) => {
    if (err) {
      console.error("ERROR GET GOAL BY ID:", err);

      return res.status(500).json({
        message: "Gagal mengambil detail saving goal",
        error: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Saving goal tidak ditemukan atau bukan milik user ini.",
      });
    }

    res.status(200).json({
      message: "Detail saving goal berhasil diambil",
      data: results[0],
    });
  });
};

const createGoal = (req, res) => {
  const id_user = getUserId(req);

  const {
    goal_name,
    target_amount,
    target_date,
  } = req.body;

  if (!id_user) {
    return res.status(401).json({
      message: "User tidak valid atau belum login.",
    });
  }

  if (!goal_name || !target_amount || !target_date) {
    return res.status(400).json({
      message: "Nama goal, target amount, dan target date wajib diisi.",
    });
  }

  if (Number(target_amount) <= 0) {
    return res.status(400).json({
      message: "Target amount harus lebih dari 0.",
    });
  }

  SavingGoal.createGoal(
    {
      id_user,
      goal_name,
      target_amount,
      current_amount: 0,
      target_date,
    },
    (err, result) => {
      if (err) {
        console.error("ERROR CREATE SAVING GOAL:", err);

        return res.status(500).json({
          message: "Gagal membuat saving goal",
          error: err.message,
        });
      }

      res.status(201).json({
        message: "Saving goal berhasil dibuat",
        data: {
          id_goal: result.insertId,
          id_user,
          goal_name,
          target_amount,
          current_amount: 0,
          target_date,
        },
      });
    }
  );
};

const updateGoal = (req, res) => {
  const id_user = getUserId(req);
  const { id } = req.params;

  const {
    goal_name,
    target_amount,
    target_date,
  } = req.body;

  if (!id_user) {
    return res.status(401).json({
      message: "User tidak valid atau belum login.",
    });
  }

  if (!goal_name || !target_amount || !target_date) {
    return res.status(400).json({
      message: "Nama goal, target amount, dan target date wajib diisi.",
    });
  }

  if (Number(target_amount) <= 0) {
    return res.status(400).json({
      message: "Target amount harus lebih dari 0.",
    });
  }

  SavingGoal.updateGoal(
    id_user,
    id,
    {
      goal_name,
      target_amount,
      target_date,
    },
    (err, result) => {
      if (err) {
        console.error("ERROR UPDATE SAVING GOAL:", err);

        return res.status(500).json({
          message: "Gagal update saving goal",
          error: err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Saving goal tidak ditemukan atau bukan milik user ini.",
        });
      }

      res.status(200).json({
        message: "Saving goal berhasil diupdate",
      });
    }
  );
};

const deleteGoal = (req, res) => {
  const id_user = getUserId(req);
  const { id } = req.params;

  if (!id_user) {
    return res.status(401).json({
      message: "User tidak valid atau belum login.",
    });
  }

  SavingGoal.deleteGoal(id_user, id, (err, result) => {
    if (err) {
      console.error("ERROR DELETE SAVING GOAL:", err);

      return res.status(500).json({
        message: "Gagal menghapus saving goal",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Saving goal tidak ditemukan atau bukan milik user ini.",
      });
    }

    res.status(200).json({
      message: "Saving goal berhasil dihapus",
    });
  });
};

const addContribution = (req, res) => {
  const id_user = getUserId(req);
  const { id } = req.params;

  const {
    amount,
    contribution_date,
  } = req.body;

  if (!id_user) {
    return res.status(401).json({
      message: "User tidak valid atau belum login.",
    });
  }

  if (!amount) {
    return res.status(400).json({
      message: "Amount wajib diisi.",
    });
  }

  if (Number(amount) <= 0) {
    return res.status(400).json({
      message: "Amount harus lebih dari 0.",
    });
  }

  SavingGoal.addContribution(
    id_user,
    id,
    {
      amount,
      contribution_date,
    },
    (err, result) => {
      if (err) {
        console.error("ERROR ADD CONTRIBUTION:", err);

        return res.status(500).json({
          message: "Gagal tambah kontribusi",
          error: err.message,
        });
      }

      if (result?.notFound) {
        return res.status(404).json({
          message: "Saving goal tidak ditemukan atau bukan milik user ini.",
        });
      }

      res.status(201).json({
        message: "Kontribusi berhasil ditambahkan",
        data: {
          id_contribution: result.insertId,
          id_goal: id,
          amount,
          contribution_date,
        },
      });
    }
  );
};

const getContributions = (req, res) => {
  const id_user = getUserId(req);
  const { id } = req.params;

  if (!id_user) {
    return res.status(401).json({
      message: "User tidak valid atau belum login.",
    });
  }

  SavingGoal.getContributionsByGoal(id_user, id, (err, results) => {
    if (err) {
      console.error("ERROR GET CONTRIBUTIONS:", err);

      return res.status(500).json({
        message: "Gagal mengambil kontribusi",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "Data kontribusi berhasil diambil",
      data: results,
    });
  });
};

const deleteContribution = (req, res) => {
  const id_user = getUserId(req);
  const { idContribution } = req.params;

  if (!id_user) {
    return res.status(401).json({
      message: "User tidak valid atau belum login.",
    });
  }

  SavingGoal.deleteContribution(
    id_user,
    idContribution,
    (err, result) => {
      if (err) {
        console.error("ERROR DELETE CONTRIBUTION:", err);

        return res.status(500).json({
          message: "Gagal menghapus kontribusi",
          error: err.message,
        });
      }

      if (result?.notFound || result.affectedRows === 0) {
        return res.status(404).json({
          message: "Kontribusi tidak ditemukan atau bukan milik user ini.",
        });
      }

      res.status(200).json({
        message: "Kontribusi berhasil dihapus",
      });
    }
  );
};

module.exports = {
  getGoals,
  getGoalById,
  createGoal,
  updateGoal,
  deleteGoal,
  addContribution,
  getContributions,
  deleteContribution,
};