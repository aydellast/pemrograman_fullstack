import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import api from "../../services/api";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const username = localStorage.getItem("username") || "User";

  const [summary, setSummary] = useState({
    totalBalance: 6500000,
    totalIncome: 19500000,
    totalExpense: 13000000,
    totalSaving: 4000000,
  });

  const [chartData, setChartData] = useState([
    { month: "Jan", income: 4000000, expense: 2500000 },
    { month: "Feb", income: 5000000, expense: 3000000 },
    { month: "Mar", income: 4500000, expense: 3500000 },
    { month: "Apr", income: 6000000, expense: 4000000 },
  ]);

  const [activities, setActivities] = useState([
    {
      id: 1,
      title: "Beli Bahan Dimsum",
      category: "Operasional",
      amount: 150000,
      type: "Expense",
    },
    {
      id: 2,
      title: "Gas Elpiji 3kg",
      category: "Dapur",
      amount: 22000,
      type: "Expense",
    },
    {
      id: 3,
      title: "Gaji Bulanan",
      category: "Gaji",
      amount: 5000000,
      type: "Income",
    },
  ]);

  const [savingGoal, setSavingGoal] = useState({
    goal_name: "Laptop Gaming",
    target_amount: 10000000,
    current_amount: 4000000,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get("/dashboard");

      if (response.data?.summary) {
        setSummary(response.data.summary);
      }

      if (response.data?.chartData) {
        setChartData(response.data.chartData);
      }

      if (response.data?.activities) {
        setActivities(response.data.activities);
      }

      if (response.data?.savingGoal) {
        setSavingGoal(response.data.savingGoal);
      }
    } catch (error) {
      console.log("Dashboard memakai data sementara:", error.message);
    }
  };

  const savingProgress = Math.round(
    (Number(savingGoal.current_amount) / Number(savingGoal.target_amount)) * 100
  );

  return (
    <section className={styles.dashboard}>
      <div className={styles.topbar}>
        <div>
          <h1>Welcome Back, {username}</h1>
          <p>Here is your financial summary today.</p>
        </div>

        <div className={styles.searchBox}>
          <input type="text" placeholder="Search transactions..." />
        </div>

        <div className={styles.userBadge}>
          <img src="/logo-cuppycash.jpeg" alt="User" />
          <span>{username}</span>
        </div>
      </div>

      <div className={styles.dashboardGrid}>
        <main className={styles.mainContent}>
          <div className={styles.cardsGrid}>
            <SummaryCard
              title="Total Balance"
              amount={summary.totalBalance}
              icon="💼"
              variant="teal"
            />

            <SummaryCard
              title="Total Expense"
              amount={summary.totalExpense}
              icon="🧾"
              variant="pink"
            />

            <SummaryCard
              title="Total Savings"
              amount={summary.totalSaving}
              icon="🎯"
              variant="purple"
            />
          </div>

          <div className={styles.chartCard}>
            <div className={styles.sectionHeader}>
              <div>
                <h2>Income vs Expense</h2>
                <p>Monthly financial movement</p>
              </div>

              <Link to="/charts">View detail</Link>
            </div>

            <div className={styles.chartWrap}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="incomePink" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff5fa2" stopOpacity={0.55} />
                      <stop offset="95%" stopColor="#ff5fa2" stopOpacity={0.04} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke="#f2d4df" />
                  <XAxis dataKey="month" stroke="#9b7a89" />
                  <YAxis stroke="#9b7a89" />

                  <Tooltip
                    formatter={(value) =>
                      `Rp ${Number(value).toLocaleString("id-ID")}`
                    }
                  />

                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#ff4f9a"
                    fill="url(#incomePink)"
                    strokeWidth={3}
                    name="Income"
                  />

                  <Area
                    type="monotone"
                    dataKey="expense"
                    stroke="#b35cff"
                    fill="#f1d9ff"
                    strokeWidth={3}
                    name="Expense"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>

        <aside className={styles.sidePanel}>
          <div className={styles.panelCard}>
            <div className={styles.sectionHeader}>
              <div>
                <h2>Recent Activities</h2>
                <p>Latest transactions</p>
              </div>
            </div>

            <div className={styles.activityList}>
              {activities.slice(0, 5).map((item) => (
                <div key={item.id} className={styles.activityItem}>
                  <span
                    className={
                      item.type === "Income"
                        ? styles.activityIconIncome
                        : styles.activityIconExpense
                    }
                  >
                    {item.type === "Income" ? "+" : "−"}
                  </span>

                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.category}</p>
                  </div>

                  <strong>
                    Rp {Number(item.amount).toLocaleString("id-ID")}
                  </strong>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.panelCard}>
            <h2>Saving Goal</h2>
            <p className={styles.goalName}>{savingGoal.goal_name}</p>

            <div className={styles.progressInfo}>
              <span>
                Rp {Number(savingGoal.current_amount).toLocaleString("id-ID")}
              </span>
              <span>
                Rp {Number(savingGoal.target_amount).toLocaleString("id-ID")}
              </span>
            </div>

            <div className={styles.progressBar}>
              <div style={{ width: `${savingProgress}%` }} />
            </div>

            <p className={styles.progressText}>{savingProgress}% tercapai</p>

            <Link to="/saving-goals" className={styles.smallButton}>
              Manage Goal
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}

function SummaryCard({ title, amount, icon, variant }) {
  return (
    <div className={`${styles.summaryCard} ${styles[variant]}`}>
      <div className={styles.cardTop}>
        <span>{icon}</span>
      </div>

      <p>{title}</p>
      <h2>Rp {Number(amount).toLocaleString("id-ID")}</h2>
    </div>
  );
}

export default Dashboard;