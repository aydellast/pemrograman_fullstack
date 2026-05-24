import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

function Chart() {
  const data = [
    {
      month: "Jan",
      income: 4000000,
      expense: 2500000,
    },
    {
      month: "Feb",
      income: 5000000,
      expense: 3000000,
    },
    {
      month: "Mar",
      income: 4500000,
      expense: 3500000,
    },
    {
      month: "Apr",
      income: 6000000,
      expense: 4000000,
    },
  ];

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2
        style={{
          color: "white",
          marginBottom: "20px",
        }}
      >
        Financial Overview
      </h2>

      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient
              id="incomeColor"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#4f46e5"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="#4f46e5"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
          />

          <XAxis dataKey="month" stroke="#94a3b8" />

          <YAxis stroke="#94a3b8" />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="income"
            stroke="#4f46e5"
            fillOpacity={1}
            fill="url(#incomeColor)"
          />

          <Line
            type="monotone"
            dataKey="expense"
            stroke="#ef4444"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;