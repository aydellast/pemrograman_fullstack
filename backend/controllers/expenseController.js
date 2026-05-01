const db = require('../config/database');

const expenseController = { 
    addExpense: async (req, res) => { 
        try { 
            // 1. Ambil data dari Body Request (Sprint 7 menggunakan form-data)
            const { id_category, amount, transaction_date, description } = req.body; 
            
            // 2. SPRINT 6: Ambil ID User dari Token JWT (Keamanan)
            // Kita tidak lagi mengambil id_user dari req.body untuk mencegah pemalsuan identitas
            const id_user = req.user.id; 
             
            // 3. SPRINT 7: Menangani Upload File
            // Mengambil nama file yang sudah di-rename otomatis oleh middleware upload
            const bukti_pengeluaran = req.file ? req.file.filename : null; 
 
            // 4. SPRINT 5: Validasi & Error Handling
            // Mencegah angka minus atau kosong masuk ke pembukuan Bytesam
            if (!amount || amount <= 0) { 
                return res.status(400).json({ message: "Jumlah pengeluaran tidak valid!" }); 
            } 
 
            // 5. Query Database
            // Pastikan nama kolom di database kamu sesuai (bukti_pengeluaran atau image_url)
            // Pastikan nama tabelnya 'pengeluaran' dan kolom fotonya 'image_url'
const query = "INSERT INTO pengeluaran (id_user, id_category, amount, transaction_date, description, image_url) VALUES (?, ?, ?, ?, ?, ?)";
             
            db.query(query, [id_user, id_category, amount, transaction_date, description, bukti_pengeluaran], (err, result) => { 
                if (err) {
                    return res.status(500).json({ message: "Gagal menyimpan ke database", error: err.message });
                }
                
                res.status(201).json({ 
                    message: "Pengeluaran berhasil dicatat! ✅",
                    data: {
                        id_transaksi: result.insertId,
                        bukti: bukti_pengeluaran
                    }
                }); 
            }); 

        } catch (error) { 
            // SPRINT 5: Menghindari aplikasi crash jika terjadi error tak terduga
            res.status(500).json({ message: "Gagal memproses pengeluaran", error: error.message }); 
        } 
    } 
}; 

module.exports = expenseController;