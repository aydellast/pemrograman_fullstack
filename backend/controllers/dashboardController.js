const Dashboard = require("../models/dashboardModel");

const getUserId = (req) => {
  return req.user?.id_user || req.user?.id;
};

exports.getDashboardData = (req, res) => {
  const id_user = getUserId(req);

  if (!id_user) {
    return res.status(401).json({
      message: "User tidak terdeteksi. Silakan login ulang.",
    });
  }

  Dashboard.getSummary(id_user, (summaryErr, summaryResult) => {
    if (summaryErr) {
      return res.status(500).json({
        message: "Gagal mengambil summary dashboard",
        error: summaryErr.message,
      });
    }

    Dashboard.getTotalSaving(id_user, (savingErr, savingResult) => {
      if (savingErr) {
        return res.status(500).json({
          message: "Gagal mengambil total saving",
          error: savingErr.message,
        });
      }

      Dashboard.getMonthlyChart(id_user, (chartErr, chartResult) => {
        if (chartErr) {
          return res.status(500).json({
            message: "Gagal mengambil chart dashboard",
            error: chartErr.message,
          });
        }

        Dashboard.getRecentActivities(id_user, (activityErr, activityResult) => {
          if (activityErr) {
            return res.status(500).json({
              message: "Gagal mengambil recent activities",
              error: activityErr.message,
            });
          }

          Dashboard.getLatestSavingGoal(id_user, (goalErr, goalResult) => {
            if (goalErr) {
              return res.status(500).json({
                message: "Gagal mengambil saving goal",
                error: goalErr.message,
              });
            }

            const transactionSummary = summaryResult[0] || {};
            const savingSummary = savingResult[0] || {};

            const totalIncome = Number(transactionSummary.total_income || 0);
            const totalExpense = Number(transactionSummary.total_expense || 0);
            const totalSaving = Number(savingSummary.total_saving || 0);
            const totalBalance = totalIncome - totalExpense;

            const chartData = chartResult.map((item) => ({
              month: item.month,
              income: Number(item.income || 0),
              expense: Number(item.expense || 0),
            }));

            const activities = activityResult.map((item) => ({
              id: item.id,
              title: item.title || item.category || "Transaksi",
              category: item.category,
              amount: Number(item.amount || 0),
              type: item.type,
              transaction_date: item.transaction_date,
            }));

            const savingGoal =
              goalResult.length > 0
                ? {
                    id_goal: goalResult[0].id_goal,
                    goal_name: goalResult[0].goal_name,
                    target_amount: Number(goalResult[0].target_amount || 0),
                    current_amount: Number(goalResult[0].current_amount || 0),
                    target_date: goalResult[0].target_date,
                    progress: Number(goalResult[0].progress || 0),
                  }
                : null;

            res.status(200).json({
              message: "Dashboard data berhasil diambil",
              summary: {
                totalIncome,
                totalExpense,
                totalSaving,
                totalBalance,
                totalTransaction: Number(
                  transactionSummary.total_transaction || 0
                ),
              },
              chartData,
              activities,
              savingGoal,
            });
          });
        });
      });
    });
  });
};

exports.getSummary = (req, res) => {
  const id_user = getUserId(req);

  if (!id_user) {
    return res.status(401).json({
      message: "User tidak terdeteksi. Silakan login ulang.",
    });
  }

  Dashboard.getSummary(id_user, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
        error: err.message,
      });
    }

    const data = result[0] || {};

    const totalIncome = Number(data.total_income || 0);
    const totalExpense = Number(data.total_expense || 0);

    res.json({
      message: "Dashboard summary berhasil",
      data: {
        total_income: totalIncome,
        total_expense: totalExpense,
        balance: totalIncome - totalExpense,
        total_transaction: Number(data.total_transaction || 0),
      },
    });
  });
};