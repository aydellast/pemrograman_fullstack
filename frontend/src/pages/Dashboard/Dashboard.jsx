import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

// Data Mockup yang sinkron dengan halaman Expenses (Konsep Layered Driven)
const currentExpenses = [
  { id: 1, title: 'Beli Bahan Dimsum', amount: 150000, category: 'Operasional', date: '2026-05-20' },
  { id: 2, title: 'Gas Elpiji 3kg', amount: 22000, category: 'Dapur', date: '2026-05-22' },
];

function Dashboard() {
  // 1. Menghitung Total Pengeluaran Secara Otomatis Menggunakan .reduce()
  const totalExpenses = currentExpenses.reduce((sum, item) => sum + item.amount, 0);

  // 2. Menghitung Pengeluaran per Kategori
  const operasionalTotal = currentExpenses
    .filter(item => item.category === 'Operasional')
    .reduce((sum, item) => sum + item.amount, 0);

  const dapurTotal = currentExpenses
    .filter(item => item.category === 'Dapur')
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <>
      {/* Mempertahankan Navbar bawaan CuppyCash */}
      <Navbar />

      <div style={{ padding: '30px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'sans-serif' }}>
        
        {/* HEADER DASHBOARD */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ margin: 0 }}>Dashboard</h1>
            <p style={{ margin: '5px 0 0 0', color: '#666' }}>Welcome to CuppyCash</p>
          </div>
          {/* Tombol Navigasi untuk menuju ke fitur Pengeluaran kamu */}
          <Link to="/expenses" style={{ padding: '10px 15px', background: '#28a745', color: '#fff', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
            💸 Kelola Pengeluaran
          </Link>
        </div>

        {/* KARTU RINGKASAN UTAMA (Menerapkan Grid Responsif sesuai Panduan Hal. 10) */}
        <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', marginBottom: '40px' }}>
          <div style={{ background: '#fff3cd', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '5px solid #ffc107' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#856404' }}>Total Pengeluaran Bulan Ini</h4>
            <h2 style={{ margin: 0, color: '#856404' }}>Rp {totalExpenses.toLocaleString('id-ID')}</h2>
          </div>

          <div style={{ background: '#d1ecf1', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '5px solid #17a2b8' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#0c5460' }}>Biaya Operasional</h4>
            <h2 style={{ margin: 0, color: '#0c5460' }}>Rp {operasionalTotal.toLocaleString('id-ID')}</h2>
          </div>

          <div style={{ background: '#f8d7da', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '5px solid #dc3545' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#721c24' }}>Biaya Keperluan Dapur</h4>
            <h2 style={{ margin: 0, color: '#721c24' }}>Rp {dapurTotal.toLocaleString('id-ID')}</h2>
          </div>
        </div>

        {/* RECENT TRANSACTIONS TABLE */}
        <h3 style={{ marginBottom: '15px' }}>🔄 Aktivitas Transaksi Terakhir</h3>
        <div style={{ background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left', color: '#666' }}>
                <th style={{ padding: '12px 8px' }}>Tanggal</th>
                <th style={{ padding: '12px 8px' }}>Deskripsi</th>
                <th style={{ padding: '12px 8px' }}>Kategori</th>
                <th style={{ padding: '12px 8px', textAlign: 'right' }}>Nominal</th>
              </tr>
            </thead>
            <tbody>
              {currentExpenses.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                  <td style={{ padding: '12px 8px', color: '#555' }}>{item.date}</td>
                  <td style={{ padding: '12px 8px', fontWeight: 'bold' }}>{item.title}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <span style={{ background: '#eee', padding: '3px 8px', borderRadius: '12px', fontSize: '12px' }}>{item.category}</span>
                  </td>
                  <td style={{ padding: '12px 8px', textAlign: 'right', color: '#dc3545', fontWeight: 'bold' }}>
                    - Rp {item.amount.toLocaleString('id-ID')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Mempertahankan Footer bawaan CuppyCash */}
      <Footer />
    </>
  );
}

export default Dashboard;