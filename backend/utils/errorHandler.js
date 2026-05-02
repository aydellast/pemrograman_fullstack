const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Cetak error di terminal untuk developer
    
    // Format error seragam untuk seluruh aplikasi
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Terjadi kesalahan pada server (Internal Server Error)",
        error: process.env.NODE_ENV === 'development' ? err.stack : {} // Hanya tampilkan stack trace di development
    });
};

module.exports = errorHandler;