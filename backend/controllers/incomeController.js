const Transaction = require("../models/incomeModel");

exports.createIncome = async (req, res) => {
  try {
    const { amount, category_id, description, date } = req.body;

    const income = await Transaction.create({
      user_id: req.user.id_user,
      category_id,
      amount,
      type: "income",
      description,
      date,
    });

    res.status(201).json({
      message: "Pemasukan berhasil ditambahkan",
      data: income,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllIncome = async (req, res) => {
  try {
    const data = await Transaction.findAll({
      where: {
        user_id: req.user.id,
        type: "income",
      },
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};