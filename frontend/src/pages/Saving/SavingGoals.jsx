import { useEffect, useRef, useState } from "react";
import api from "../../services/api";
import "./SavingGoals.css";

function SavingGoals() {
  const [goals, setGoals] = useState([]);

  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [selectedGoalId, setSelectedGoalId] = useState("");
  const [amount, setAmount] = useState("");
  const [contributionDate, setContributionDate] = useState("");

  const [contributions, setContributions] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const goalFormRef = useRef(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  const formatRupiah = (value) => {
    return `Rp ${Number(value || 0).toLocaleString("id-ID")}`;
  };

  const fetchGoals = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await api.get("/saving-goals");
      const result = response.data?.data || response.data;

      setGoals(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("Gagal mengambil saving goals:", error);

      setMessage(
        error.response?.data?.message ||
          "Gagal mengambil data saving goals."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchContributions = async (idGoal) => {
    if (!idGoal) {
      setContributions([]);
      return;
    }

    try {
      const response = await api.get(
        `/saving-goals/${idGoal}/contributions`
      );

      const result = response.data?.data || response.data;

      setContributions(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("Gagal mengambil kontribusi:", error);
      setContributions([]);
    }
  };

  const resetGoalForm = () => {
    setGoalName("");
    setTargetAmount("");
    setTargetDate("");
    setEditingId(null);
  };

  const resetContributionForm = () => {
    setAmount("");
    setContributionDate("");
  };

  const handleGoalSubmit = async (e) => {
    e.preventDefault();

    if (!goalName || !targetAmount || !targetDate) {
      alert("Nama goal, target amount, dan target date wajib diisi.");
      return;
    }

    if (Number(targetAmount) <= 0) {
      alert("Target amount harus lebih dari 0.");
      return;
    }

    try {
      const payload = {
        goal_name: goalName,
        target_amount: Number(targetAmount),
        target_date: targetDate,
      };

      if (editingId) {
        await api.put(`/saving-goals/${editingId}`, payload);
        alert("Saving goal berhasil diperbarui.");
      } else {
        await api.post("/saving-goals", payload);
        alert("Saving goal berhasil ditambahkan.");
      }

      resetGoalForm();
      fetchGoals();
    } catch (error) {
      console.error("Gagal menyimpan saving goal:", error);

      alert(
        error.response?.data?.message ||
          "Gagal menyimpan saving goal."
      );
    }
  };

  const handleEditGoal = (goal) => {
    setEditingId(goal.id_goal);
    setGoalName(goal.goal_name || "");
    setTargetAmount(goal.target_amount || "");
    setTargetDate(
      goal.target_date ? String(goal.target_date).slice(0, 10) : ""
    );

    setTimeout(() => {
      goalFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  const handleDeleteGoal = async (idGoal) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus saving goal ini? Semua kontribusinya juga akan terhapus."
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/saving-goals/${idGoal}`);

      alert("Saving goal berhasil dihapus.");

      if (String(selectedGoalId) === String(idGoal)) {
        setSelectedGoalId("");
        setContributions([]);
      }

      fetchGoals();
    } catch (error) {
      console.error("Gagal menghapus saving goal:", error);

      alert(
        error.response?.data?.message ||
          "Gagal menghapus saving goal."
      );
    }
  };

  const handleSelectGoal = (idGoal) => {
    setSelectedGoalId(idGoal);
    fetchContributions(idGoal);

    setTimeout(() => {
      document.querySelector(".contribution-card")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  const handleContributionSubmit = async (e) => {
    e.preventDefault();

    if (!selectedGoalId) {
      alert("Pilih saving goal terlebih dahulu.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      alert("Nominal kontribusi harus lebih dari 0.");
      return;
    }

    try {
      await api.post(`/saving-goals/${selectedGoalId}/contributions`, {
        amount: Number(amount),
        contribution_date: contributionDate || undefined,
      });

      alert("Kontribusi berhasil ditambahkan.");

      resetContributionForm();
      fetchGoals();
      fetchContributions(selectedGoalId);
    } catch (error) {
      console.error("Gagal tambah kontribusi:", error);

      alert(
        error.response?.data?.message ||
          "Gagal tambah kontribusi."
      );
    }
  };

  const handleDeleteContribution = async (idContribution) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus kontribusi ini?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(
        `/saving-goals/contributions/${idContribution}`
      );

      alert("Kontribusi berhasil dihapus.");

      fetchGoals();
      fetchContributions(selectedGoalId);
    } catch (error) {
      console.error("Gagal hapus kontribusi:", error);

      alert(
        error.response?.data?.message ||
          "Gagal hapus kontribusi."
      );
    }
  };

  const totalTarget = goals.reduce(
    (sum, goal) => sum + Number(goal.target_amount || 0),
    0
  );

  const totalSaved = goals.reduce(
    (sum, goal) => sum + Number(goal.current_amount || 0),
    0
  );

  return (
    <section className="saving-page">
      <div className="saving-hero">
        <div>
          <p className="saving-eyebrow">Saving Progress</p>

          <h1>Saving Goals</h1>

          <p>
            Buat target tabungan, tambahkan kontribusi, dan pantau progress
            tabunganmu secara otomatis.
          </p>
        </div>

        <div className="saving-summary">
          <span>Total Terkumpul</span>

          <h2>{formatRupiah(totalSaved)}</h2>

          <p>dari target {formatRupiah(totalTarget)}</p>
        </div>
      </div>

      {message && (
        <div className="saving-error">
          {message}
        </div>
      )}

      <div className="saving-layout">
        <div className="saving-form-card" ref={goalFormRef}>
          <h2>{editingId ? "Edit Goal" : "Tambah Goal"}</h2>

          {editingId && (
            <p
              style={{
                marginTop: "-6px",
                marginBottom: "16px",
                color: "#c94f7c",
                fontWeight: "800",
              }}
            >
              Kamu sedang mengedit saving goal. Klik Update untuk menyimpan.
            </p>
          )}

          <form onSubmit={handleGoalSubmit} className="saving-form">
            <div className="saving-form-group">
              <label>Nama Goal</label>

              <input
                type="text"
                placeholder="Contoh: Laptop Gaming"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
              />
            </div>

            <div className="saving-form-group">
              <label>Target Amount</label>

              <input
                type="number"
                placeholder="Contoh: 10000000"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
              />
            </div>

            <div className="saving-form-group">
              <label>Target Date</label>

              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
              />
            </div>

            <div className="saving-form-actions">
              <button className="saving-btn-primary" type="submit">
                {editingId ? "Update" : "Tambah"}
              </button>

              {editingId && (
                <button
                  className="saving-btn-secondary"
                  type="button"
                  onClick={resetGoalForm}
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="saving-form-card">
          <h2>Tambah Kontribusi</h2>

          <form
            onSubmit={handleContributionSubmit}
            className="saving-form"
          >
            <div className="saving-form-group">
              <label>Pilih Goal</label>

              <select
                value={selectedGoalId}
                onChange={(e) => handleSelectGoal(e.target.value)}
              >
                <option value="">Pilih saving goal</option>

                {goals.map((goal) => (
                  <option key={goal.id_goal} value={goal.id_goal}>
                    {goal.goal_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="saving-form-group">
              <label>Nominal Kontribusi</label>

              <input
                type="number"
                placeholder="Contoh: 500000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="saving-form-group">
              <label>Tanggal Kontribusi</label>

              <input
                type="date"
                value={contributionDate}
                onChange={(e) => setContributionDate(e.target.value)}
              />
            </div>

            <button className="saving-btn-primary" type="submit">
              Tambah Kontribusi
            </button>
          </form>
        </div>
      </div>

      <div className="goals-card">
        <div className="saving-section-header">
          <div>
            <h2>Daftar Saving Goals</h2>
            <p>Total {goals.length} target tabungan.</p>
          </div>
        </div>

        {loading && (
          <div className="saving-state">
            Memuat saving goals...
          </div>
        )}

        {!loading && goals.length === 0 && (
          <div className="saving-state">
            Belum ada saving goals. Tambahkan target pertamamu.
          </div>
        )}

        {!loading && goals.length > 0 && (
          <div className="goals-grid">
            {goals.map((goal) => {
              const progress = Number(goal.progress || 0);

              return (
                <div className="goal-item" key={goal.id_goal}>
                  <div className="goal-top">
                    <div className="goal-icon">🎯</div>

                    <span className="goal-status">
                      {progress >= 100 ? "Completed" : "In Progress"}
                    </span>
                  </div>

                  <h3>{goal.goal_name}</h3>

                  <p className="goal-date">
                    Target Date:{" "}
                    {goal.target_date
                      ? String(goal.target_date).slice(0, 10)
                      : "-"}
                  </p>

                  <div className="goal-amounts">
                    <span>{formatRupiah(goal.current_amount)}</span>
                    <span>{formatRupiah(goal.target_amount)}</span>
                  </div>

                  <div className="saving-progress-bar">
                    <div
                      style={{
                        width: `${Math.min(progress, 100)}%`,
                      }}
                    />
                  </div>

                  <p className="progress-text">
                    {progress}% tercapai
                  </p>

                  <div className="goal-actions">
                    <button
                      className="saving-edit-btn"
                      type="button"
                      onClick={() => handleEditGoal(goal)}
                    >
                      Edit
                    </button>

                    <button
                      className="saving-detail-btn"
                      type="button"
                      onClick={() => handleSelectGoal(goal.id_goal)}
                    >
                      Kontribusi
                    </button>

                    <button
                      className="saving-delete-btn"
                      type="button"
                      onClick={() => handleDeleteGoal(goal.id_goal)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedGoalId && (
        <div className="contribution-card">
          <h2>Riwayat Kontribusi</h2>

          {contributions.length === 0 ? (
            <div className="saving-state">
              Belum ada kontribusi untuk goal ini.
            </div>
          ) : (
            <div className="contribution-list">
              {contributions.map((item) => (
                <div
                  className="contribution-item"
                  key={item.id_contribution}
                >
                  <div>
                    <h3>{formatRupiah(item.amount)}</h3>

                    <p>
                      {item.contribution_date
                        ? String(item.contribution_date).slice(0, 10)
                        : "-"}
                    </p>
                  </div>

                  <button
                    className="saving-delete-btn"
                    type="button"
                    onClick={() =>
                      handleDeleteContribution(item.id_contribution)
                    }
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default SavingGoals;