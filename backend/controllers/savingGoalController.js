const savingGoalModel = require('../models/savingGoalModel');

const getGoals = (req, res) => {
    const userId = req.user.id_user;

    savingGoalModel.getGoals(userId, (err, results) => {
        if (err) return res.status(500).json({ message: 'Error' });

        res.json({
            message: 'Data goals',
            data: results
        });
    });
};

const createGoal = (req, res) => {
    const userId = req.user.id_user;
    const { goal_name, target_amount, target_date } = req.body;

    const data = [userId, goal_name, target_amount, target_date];

    savingGoalModel.createGoal(data, (err, result) => {
        if (err) return res.status(500).json({ message: 'Gagal buat goal' });

        res.json({
            message: 'Goal berhasil dibuat',
            id_goal: result.insertId
        });
    });
};

const addContribution = (req, res) => {
    const { id } = req.params;
    const { amount, contribution_date } = req.body;

    const data = [id, amount, contribution_date];

    savingGoalModel.addContribution(data, (err) => {
        if (err) return res.status(500).json({ message: 'Gagal tambah kontribusi' });

        res.json({
            message: 'Kontribusi berhasil ditambahkan'
        });
    });
};

module.exports = {
    getGoals,
    createGoal,
    addContribution
};