const mysql = require('mysql2');

// Konfigurasi koneksi ke database
const db = mysql.createConnection({
  host: 'localhost',       // Alamat server database
  user: 'root',            // Username database
  password: '',            // Password database
  database: 'polres',       // Nama database Anda
});

// Menghubungkan ke database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    process.exit(1); // Keluar jika gagal koneksi
  } else {
    console.log('Connected to the MySQL database.');
  }
});

module.exports = db;
