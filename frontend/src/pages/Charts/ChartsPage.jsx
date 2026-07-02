import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import api from "../../services/api";
import "./ChartsPage.css";

const pieColors = [
  "#ff71a8",
  "#cf5cff",
  "#18d4bd",
  "#ffb86b",
  "#8f7cff",
  "#ff8f8f",
  "#72d6ff",
  "#ffd166",
];

function ChartsPage() {
  const [summary, setSummary] = useState({
    total_income: 0,
    total_expense: 0,
    balance: 0,
    total_transaction: 0,
    total_income_transaction: 0,
    total_expense_transaction: 0,
  });

  const [monthlyData, setMonthlyData] = useState([]);
  const [expenseCategoryData, setExpenseCategoryData] = useState([]);
  const [incomeCategoryData, setIncomeCategoryData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchChartData();
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

  const fetchChartData = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const [
        summaryResponse,
        monthlyResponse,
        expenseCategoryResponse,
        incomeCategoryResponse,
      ] = await Promise.all([
        api.get("/charts/summary"),
        api.get("/charts/monthly"),
        api.get("/charts/expense-category"),
        api.get("/charts/income-category"),
      ]);

      setSummary(summaryResponse.data?.data || summary);

      setMonthlyData(
        Array.isArray(monthlyResponse.data?.data)
          ? monthlyResponse.data.data
          : []
      );

      setExpenseCategoryData(
        Array.isArray(expenseCategoryResponse.data?.data)
          ? expenseCategoryResponse.data.data
          : []
      );

      setIncomeCategoryData(
        Array.isArray(incomeCategoryResponse.data?.data)
          ? incomeCategoryResponse.data.data
          : []
      );
    } catch (error) {
      console.error("Gagal mengambil data chart:", error);

      setErrorMessage(
        error.response?.data?.message ||
          "Gagal mengambil data chart dari server."
      );
    } finally {
      setLoading(false);
    }
  };

  const biggestExpenseCategory = useMemo(() => {
    if (expenseCategoryData.length === 0) return null;

    return expenseCategoryData.reduce((max, item) =>
      Number(item.total_amount) > Number(max.total_amount) ? item : max
    );
  }, [expenseCategoryData]);

  const savingRate = useMemo(() => {
    if (Number(summary.total_income) === 0) return 0;

    return Math.round(
      (Number(summary.balance) / Number(summary.total_income)) * 100
    );
  }, [summary]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <strong>{label}</strong>

          {payload.map((item) => (
            <p key={item.dataKey}>
              {item.name}: {formatRupiah(item.value)}
            </p>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <section className="charts-page">
      <div className="charts-hero">
        <div>
          <p className="charts-eyebrow">Financial Analytics</p>

          <h1>Grafik Keuangan</h1>

          <p>
            Pantau pemasukan, pengeluaran, saldo, dan kategori transaksi
            berdasarkan data asli dari CuppyCash.
          </p>
        </div>

        <button className="refresh-btn" onClick={fetchChartData}>
          Refresh Data
        </button>
      </div>

      {loading && (
        <div className="charts-state">
          Memuat data grafik...
        </div>
      )}

      {errorMessage && !loading && (
        <div className="charts-error">
          {errorMessage}
        </div>
      )}

      {!loading && (
        <>
          <div className="summary-grid">
            <SummaryCard
              title="Total Income"
              value={summary.total_income}
              icon="💰"
              type="income"
            />

            <SummaryCard
              title="Total Expense"
              value={summary.total_expense}
              icon="🧾"
              type="expense"
            />

            <SummaryCard
              title="Balance"
              value={summary.balance}
              icon="🌸"
              type="balance"
            />

            <div className="summary-card transaction-card">
              <div className="summary-icon">📊</div>

              <p>Total Transaction</p>

              <h2>
                {Number(summary.total_transaction || 0).toLocaleString(
                  "id-ID"
                )}
              </h2>

              <span>
                {summary.total_income_transaction} income •{" "}
                {summary.total_expense_transaction} expense
              </span>
            </div>
          </div>

          <div className="insight-grid">
            <div className="insight-card">
              <span>✨</span>

              <div>
                <h3>Saving Rate</h3>

                <p>
                  {savingRate > 0
                    ? `${savingRate}% dari income masih tersisa.`
                    : "Belum ada sisa saldo dari pemasukan."}
                </p>
              </div>
            </div>

            <div className="insight-card">
              <span>🔥</span>

              <div>
                <h3>Expense Terbesar</h3>

                <p>
                  {biggestExpenseCategory
                    ? `${biggestExpenseCategory.category_name} menjadi kategori pengeluaran terbesar dengan total ${formatRupiah(
                        biggestExpenseCategory.total_amount
                      )}.`
                    : "Belum ada data kategori pengeluaran."}
                </p>
              </div>
            </div>
          </div>

          <div className="charts-layout">
            <div className="chart-card wide">
              <div className="chart-card-header">
                <div>
                  <h2>Income vs Expense</h2>

                  <p>Perbandingan pemasukan dan pengeluaran per bulan.</p>
                </div>
              </div>

              {monthlyData.length === 0 ? (
                <EmptyChart message="Belum ada data bulanan untuk ditampilkan." />
              ) : (
                <div className="chart-container large">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData}>
                      <defs>
                        <linearGradient
                          id="incomeGradient"
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
                            stopOpacity={0.03}
                          />
                        </linearGradient>

                        <linearGradient
                          id="expenseGradient"
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
                            stopOpacity={0.03}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#f2d4df"
                      />

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

                      <Tooltip content={<CustomTooltip />} />

                      <Legend />

                      <Area
                        type="monotone"
                        dataKey="income"
                        name="Income"
                        stroke="#10b5a5"
                        fill="url(#incomeGradient)"
                        strokeWidth={3}
                      />

                      <Area
                        type="monotone"
                        dataKey="expense"
                        name="Expense"
                        stroke="#ff4f9a"
                        fill="url(#expenseGradient)"
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            <div className="chart-card">
              <div className="chart-card-header">
                <div>
                  <h2>Expense by Category</h2>

                  <p>Komposisi pengeluaran berdasarkan kategori.</p>
                </div>
              </div>

              {expenseCategoryData.length === 0 ? (
                <EmptyChart message="Belum ada data expense kategori." />
              ) : (
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenseCategoryData}
                        dataKey="total_amount"
                        nameKey="category_name"
                        cx="50%"
                        cy="50%"
                        innerRadius={58}
                        outerRadius={105}
                        paddingAngle={4}
                      >
                        {expenseCategoryData.map((entry, index) => (
                          <Cell
                            key={entry.category_name}
                            fill={pieColors[index % pieColors.length]}
                          />
                        ))}
                      </Pie>

                      <Tooltip
                        formatter={(value) => formatRupiah(value)}
                      />

                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            <div className="chart-card">
              <div className="chart-card-header">
                <div>
                  <h2>Income by Category</h2>

                  <p>Total pemasukan berdasarkan kategori.</p>
                </div>
              </div>

              {incomeCategoryData.length === 0 ? (
                <EmptyChart message="Belum ada data income kategori." />
              ) : (
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={incomeCategoryData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#d7f3ee"
                      />

                      <XAxis
                        dataKey="category_name"
                        stroke="#7b8f8b"
                        tickLine={false}
                        axisLine={false}
                      />

                      <YAxis
                        stroke="#7b8f8b"
                        tickFormatter={formatCompact}
                        tickLine={false}
                        axisLine={false}
                      />

                      <Tooltip
                        formatter={(value) => formatRupiah(value)}
                      />

                      <Bar
                        dataKey="total_amount"
                        name="Income"
                        fill="#10b5a5"
                        radius={[14, 14, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

function SummaryCard({ title, value, icon, type }) {
  return (
    <div className={`summary-card ${type}`}>
      <div className="summary-icon">{icon}</div>

      <p>{title}</p>

      <h2>
        Rp {Number(value || 0).toLocaleString("id-ID")}
      </h2>
    </div>
  );
}

function EmptyChart({ message }) {
  return (
    <div className="empty-chart">
      <span>📉</span>
      <p>{message}</p>
    </div>
  );
}

export default ChartsPage;