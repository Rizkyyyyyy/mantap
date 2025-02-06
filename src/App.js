import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Pegawai from './components/Pegawai';
import BagianDivisi from './components/BagianDivisi';
import SuratMasuk from './components/SuratMasuk';
import SuratKeluar from './components/SuratKeluar';
import SKTugasPersonel from './components/SKTugasPersonel';
import CreateAccountPolisi from './components/CreateAccountPolisi';
import ActivityLog from './components/ActivityLog';

const App = () => {
  // Mengecek status login saat aplikasi pertama kali dijalankan
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('currentUser') !== null;
  });

  // Fungsi untuk menangani login
  const handleLogin = (userData) => {
    localStorage.setItem('currentUser', JSON.stringify(userData)); // Simpan data pengguna ke localStorage
    setIsAuthenticated(true);
  };

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    localStorage.removeItem('currentUser'); // Hapus data pengguna dari localStorage
    setIsAuthenticated(false);
  };

  // Untuk menjaga status login meskipun halaman di-refresh
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setIsAuthenticated(true);
    }
  }, []);

    return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/bagian-divisi" element={<BagianDivisi />} />
              <Route path="/pegawai" element={<Pegawai />} />
              <Route path="/surat-masuk" element={<SuratMasuk />} />
              <Route path="/surat-keluar" element={<SuratKeluar />} />
              <Route path="/sk-tugas-personel" element={<SKTugasPersonel />} />
              <Route path="create-account-polisi" element={<CreateAccountPolisi />} />
              <Route path="/activity-log" element={<ActivityLog />} />
      </Routes>
    </Router>
  );
}

export default App;
