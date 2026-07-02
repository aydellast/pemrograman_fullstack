import { useEffect, useState } from "react";
import api from "../../services/api";
import "./AdminUsers.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await api.get("/manajemen-users/all-users");

      setUsers(response.data?.data || []);
    } catch (error) {
      console.error("Gagal mengambil data users:", error);

      setMessage(
        error.response?.data?.message ||
          "Gagal mengambil data user. Pastikan akun kamu Admin."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="admin-users-page">
      <div className="admin-users-hero">
        <div>
          <p className="admin-users-eyebrow">Admin Authorization</p>
          <h1>Manage Users</h1>
          <p>
            Halaman ini hanya bisa diakses oleh akun dengan role Admin.
          </p>
        </div>

        <button onClick={fetchUsers}>Refresh</button>
      </div>

      {message && (
        <div className="admin-users-error">
          {message}
        </div>
      )}

      <div className="admin-users-card">
        <div className="admin-users-header">
          <h2>Daftar User</h2>
          <p>Total {users.length} user terdaftar.</p>
        </div>

        {loading ? (
          <div className="admin-users-state">
            Memuat data user...
          </div>
        ) : users.length === 0 ? (
          <div className="admin-users-state">
            Belum ada data user.
          </div>
        ) : (
          <div className="admin-users-table-wrap">
            <table className="admin-users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Dibuat</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id_user}>
                    <td>{user.id_user}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <span
                        className={
                          user.role === "Admin"
                            ? "role-badge admin"
                            : "role-badge user"
                        }
                      >
                        {user.role}
                      </span>
                    </td>
                    <td>
                      {user.created_at
                        ? String(user.created_at).slice(0, 10)
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminUsers;