const Income = require("../models/incomeModel");

const addIncome = (req, res) => {

  const id_user = req.user.id;

  const {

    amount,

    id_category,

    description

  } = req.body;


  Income.add(

    {

      id_user,

      amount,

      id_category,

      description

    },

    (err, result) => {

      if (err) {

        return res.status(500).json({

          message: err.message

        });

      }

      res.status(201).json({

        message: "Income berhasil ditambahkan"

      });

    }

  );

};


const getAllIncome = (req, res) => {

  const id_user = req.user.id;

  Income.getAll(

    id_user,

    (err, result) => {

      if (err) {

        return res.status(500).json({

          message: err.message

        });

      }

      res.json(result);

    }

  );

};


const getIncomeById = (req, res) => {

  Income.getById(

    req.params.id,

    (err, result) => {

      if (err) {

        return res.status(500).json({

          message: err.message

        });

      }

      res.json(result[0]);

    }

  );

};


const updateIncome = (req, res) => {

  Income.update(

    req.params.id,

    req.body,

    (err) => {

      if (err) {

        return res.status(500).json({

          message: err.message

        });

      }

      res.json({

        message: "Income berhasil diupdate"

      });

    }

  );

};


const deleteIncome = (req, res) => {

  Income.delete(

    req.params.id,

    (err) => {

      if (err) {

        return res.status(500).json({

          message: err.message

        });

      }

      res.json({

        message: "Income berhasil dihapus"

      });

    }

  );

};


const getTotalIncome = (req, res) => {

  Income.total(

    req.user.id,

    (err, result) => {

      if (err) {

        return res.status(500).json({

          message: err.message

        });

      }

      res.json(result[0]);

    }

  );

};

module.exports = {

  addIncome,

  getAllIncome,

  getIncomeById,

  updateIncome,

  deleteIncome,

  getTotalIncome

};