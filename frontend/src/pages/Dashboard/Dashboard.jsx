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
  const defaultUsername = localStorage.getItem("username") || "User";
  const defaultProfileImage = "/cuppycash-logo.svg";

  const [profileInfo, setProfileInfo] = useState({
    username: defaultUsername,
    photo: defaultProfileImage,
  });

  const [summary, setSummary] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
    totalSaving: 0,
    totalTransaction: 0,
  });

  const [chartData, setChartData] = useState([]);
  const [activities, setActivities] = useState([]);
  const [savingGoal, setSavingGoal] = useState(null);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchDashboardData();
    fetchProfileData();
  }, []);

  const formatRupiah = (value) => {
    return `Rp ${Number(value || 0).toLocaleString("id-ID")}`;
  };

  const formatCompact = (value) => {
    return Number(value || 0).toLocaleString("id-ID", {
      notation: "compact",
      compactDisplay: "short",
    });
  };

  const normalizeProfilePhoto = (photo) => {
    if (!photo || typeof photo !== "string") {
      return defaultProfileImage;
    }

    if (photo.startsWith("http")) {
      return photo;
    }

    if (photo.startsWith("/uploads/")) {
      return `http://localhost:3000${photo}`;
    }

    if (photo.startsWith("uploads/")) {
      return `http://localhost:3000/${photo}`;
    }

    return `http://localhost:3000/uploads/${photo}`;
  };

  const fetchProfileData = async () => {
    try {
      const response = await api.get("/manajemen-users/profile");

      const profile = response.data?.data || response.data || {};

      const username =
        profile.username ||
        profile.name ||
        localStorage.getItem("username") ||
        "User";

      const rawPhoto =
        profile.profile_picture ||
        profile.foto_profil ||
        profile.profilePicture ||
        "";

      const photo = normalizeProfilePhoto(rawPhoto);

      setProfileInfo({
        username,
        photo,
      });

      localStorage.setItem("username", username);
    } catch (error) {
      console.log("Gagal mengambil data profile:", error.message);

      setProfileInfo({
        username: defaultUsername,
        photo: defaultProfileImage,
      });
    }
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await api.get("/dashboard");

      setSummary(
        response.data?.summary || {
          totalBalance: 0,
          totalIncome: 0,
          totalExpense: 0,
          totalSaving: 0,
          totalTransaction: 0,
        }
      );

      setChartData(
        Array.isArray(response.data?.chartData)
          ? response.data.chartData
          : []
      );

      setActivities(
        Array.isArray(response.data?.activities)
          ? response.data.activities
          : []
      );

      setSavingGoal(response.data?.savingGoal || null);
    } catch (error) {
      console.error("Gagal mengambil dashboard:", error);

      setErrorMessage(
        error.response?.data?.message ||
          "Gagal mengambil data dashboard dari server."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchDashboardData();
    fetchProfileData();
  };

  const savingProgress = savingGoal
    ? Math.round(
        (Number(savingGoal.current_amount || 0) /
          Number(savingGoal.target_amount || 1)) *
          100
      )
    : 0;

  return (
    <section className={styles.dashboard}>
      <div className={styles.topbar}>
        <div>
          <p className={styles.eyebrow}>CuppyCash Overview</p>

          <h1>Welcome Back, {profileInfo.username}</h1>

          <p>Here is your financial summary today.</p>
        </div>

        <button className={styles.refreshBtn} onClick={handleRefresh}>
          Refresh Data
        </button>

        <div className={styles.userBadge}>
          <img
            src={profileInfo.photo}
            alt=""
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = defaultProfileImage;
            }}
          />

          <span>{profileInfo.username}</span>
        </div>
      </div>

      {loading && (
        <div className={styles.stateBox}>
          Memuat dashboard...
        </div>
      )}

      {errorMessage && !loading && (
        <div className={styles.errorBox}>
          {errorMessage}
        </div>
      )}

      {!loading && (
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
                title="Total Income"
                amount={summary.totalIncome}
                icon="💰"
                variant="green"
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
                  <p>Monthly financial movement from your transactions.</p>
                </div>

                <Link to="/charts">View detail</Link>
              </div>

              {chartData.length === 0 ? (
                <div className={styles.emptyBox}>
                  Belum ada data transaksi untuk grafik.
                </div>
              ) : (
                <div className={styles.chartWrap}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient
                          id="incomeGradientDashboard"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#18d4bd"
                            stopOpacity={0.55}
                          />
                          <stop
                            offset="95%"
                            stopColor="#18d4bd"
                            stopOpacity={0.04}
                          />
                        </linearGradient>

                        <linearGradient
                          id="expenseGradientDashboard"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#ff71a8"
                            stopOpacity={0.55}
                          />
                          <stop
                            offset="95%"
                            stopColor="#ff71a8"
                            stopOpacity={0.04}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid strokeDasharray="3 3" stroke="#f2d4df" />

                      <XAxis
                        dataKey="month"
                        stroke="#9b7a89"
                        tickLine={false}
                        axisLine={false}
                      />

                      <YAxis
                        stroke="#9b7a89"
                        tickFormatter={formatCompact}
                        tickLine={false}
                        axisLine={false}
                      />

                      <Tooltip formatter={(value) => formatRupiah(value)} />

                      <Area
                        type="monotone"
                        dataKey="income"
                        stroke="#10b5a5"
                        fill="url(#incomeGradientDashboard)"
                        strokeWidth={3}
                        name="Income"
                      />

                      <Area
                        type="monotone"
                        dataKey="expense"
                        stroke="#ff4f9a"
                        fill="url(#expenseGradientDashboard)"
                        strokeWidth={3}
                        name="Expense"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </main>

          <aside className={styles.sidePanel}>
            <div className={styles.panelCard}>
              <div className={styles.sectionHeader}>
                <div>
                  <h2>Recent Activities</h2>
                  <p>Latest transactions</p>
                </div>

                <Link to="/history">View all</Link>
              </div>

              {activities.length === 0 ? (
                <div className={styles.emptyMini}>
                  Belum ada transaksi terbaru.
                </div>
              ) : (
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
                        <h4>{item.title || item.category}</h4>

                        <p>
                          {item.category} •{" "}
                          {item.transaction_date
                            ? String(item.transaction_date).slice(0, 10)
                            : "-"}
                        </p>
                      </div>

                      <strong>{formatRupiah(item.amount)}</strong>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.panelCard}>
              <div className={styles.sectionHeader}>
                <div>
                  <h2>Saving Goal</h2>
                  <p>Latest target progress</p>
                </div>
              </div>

              {!savingGoal ? (
                <div className={styles.emptyMini}>
                  Belum ada saving goal.

                  <Link to="/saving-goals" className={styles.smallButton}>
                    Create Goal
                  </Link>
                </div>
              ) : (
                <>
                  <p className={styles.goalName}>{savingGoal.goal_name}</p>

                  <div className={styles.progressInfo}>
                    <span>{formatRupiah(savingGoal.current_amount)}</span>
                    <span>{formatRupiah(savingGoal.target_amount)}</span>
                  </div>

                  <div className={styles.progressBar}>
                    <div
                      style={{
                        width: `${Math.min(savingProgress, 100)}%`,
                      }}
                    />
                  </div>

                  <p className={styles.progressText}>
                    {Math.min(savingProgress, 100)}% tercapai
                  </p>

                  <Link to="/saving-goals" className={styles.smallButton}>
                    Manage Goal
                  </Link>
                </>
              )}
            </div>

            <div className={styles.panelCard}>
              <h2>Total Transaction</h2>

              <p className={styles.bigNumber}>
                {summary.totalTransaction}
              </p>

              <span className={styles.mutedText}>
                Semua transaksi pada akun ini.
              </span>
            </div>
          </aside>
        </div>
      )}
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

      <h2>Rp {Number(amount || 0).toLocaleString("id-ID")}</h2>
    </div>
  );
}

export default Dashboard;