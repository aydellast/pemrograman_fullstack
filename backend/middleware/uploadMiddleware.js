const multer = require('multer');
const path = require('path');

// 1. Implementasi Rename Otomatis (Sprint 7)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Pastikan folder 'uploads' sudah dibuat di root project
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Format: fieldname-timestamp-randomangka.ekstensi
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

// 2. Filter Validasi File (Hanya Gambar)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        // Mengirim error jika user upload selain gambar
        cb(new Error('Format file tidak didukung! Hanya file gambar yang diizinkan.'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { 
        fileSize: 2 * 1024 * 1024 // Batasi maksimal 2MB agar server tidak berat
    } 
});

module.exports = upload;