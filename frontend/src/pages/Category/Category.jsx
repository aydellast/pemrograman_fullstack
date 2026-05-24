import { useState } from "react";

function Category() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Makanan" },
    { id: 2, name: "Transportasi" },
    { id: 3, name: "Belanja" },
  ]);

  const [name, setName] = useState("");

  const addCategory = () => {
    if (!name) return;

    setCategories([
      ...categories,
      { id: Date.now(), name },
    ]);

    setName("");
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <div style={styles.container}>
      <h2>📂 Category Transaction</h2>

      <div style={styles.form}>
        <input
          style={styles.input}
          placeholder="Tambah kategori..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button style={styles.btn} onClick={addCategory}>
          Tambah
        </button>
      </div>

      <div style={styles.list}>
        {categories.map((item) => (
          <div key={item.id} style={styles.card}>
            <span>{item.name}</span>
            <button
              style={styles.delete}
              onClick={() => deleteCategory(item.id)}
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "500px",
    margin: "auto",
    fontFamily: "Arial",
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
  },
  btn: {
    padding: "10px 15px",
    background: "green",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    background: "#f2f2f2",
    borderRadius: "6px",
  },
  delete: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default Category;