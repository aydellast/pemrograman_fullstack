import React, { useState } from 'react';

// 1. Data Mockup Awal (Sesuai panduan Layered Driven - Constant Data)
const initialExpenses = [
  { id: 1, title: 'Beli Bahan Dimsum', amount: 150000, category: 'Operasional', date: '2026-05-20' },
  { id: 2, title: 'Gas Elpiji 3kg', amount: 22000, category: 'Dapur', date: '2026-05-22' },
];

const Expenses = () => {
  // 2. State Management untuk List Pengeluaran & Form Input
  const [expenses, setExpenses] = useState(initialExpenses);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Operasional');
  const [date, setDate] = useState('');

  // 3. Handling Event untuk Form Submit
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah page refresh otomatis

    if (!title || !amount || !date) {
      alert('Mohon isi semua data pengeluaran!');
      return;
    }

    // Buat objek pengeluaran baru dengan ID unik berbasis timestamp
    const newExpense = {
      id: Date.now(),
      title,
      amount: parseInt(amount),
      category,
      date
    };

    // Implemetasi Spread Operator (...) untuk merge array (Panduan hal. 63)
    setExpenses([...expenses, newExpense]);

    // Reset Form Input setelah data tersimpan ke State
    setTitle('');
    setAmount('');
    setDate('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>💸 Manajemen Pengeluaran (Expenses)</h2>
      
      {/* FORM INPUT PENGELUARAN */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
        <h3>Tambah Pengeluaran Baru</h3>
        <div style={{ display: 'grid', gap: '15px', gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <label>Nama Pengeluaran:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px' }} placeholder="Contoh: Plastik Packing" />
          </div>
          <div>
            <label>Jumlah (Rp):</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px' }} placeholder="Contoh: 50000" />
          </div>
          <div>
            <label>Kategori:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
              <option value="Operasional">Operasional</option>
              <option value="Dapur">Dapur</option>
              <option value="Pemasaran">Pemasaran</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
          <div>
            <label>Tanggal:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </div>
        </div>
        <button type="submit" style={{ marginTop: '15px', padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Simpan Pengeluaran
        </button>
      </form>

      {/* TABEL LIST PENGELUARAN */}
      <h3>Daftar Riwayat Pengeluaran</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ background: '#007bff', color: '#fff', textAlign: 'left' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Tanggal</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nama Item</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Kategori</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nominal</th>
          </tr>
        </thead>
        <tbody>
          {/* Rendering List menggunakan .map() dan key unik (Panduan hal. 40-44) */}
          {expenses.map((expense) => (
            <tr key={expense.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{expense.date}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{expense.title}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{expense.category}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>Rp {expense.amount.toLocaleString('id-ID')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Expenses;