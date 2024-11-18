import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import BagianDivisi from './BagianDivisi';
import Pegawai from './Pegawai';
import SuratMasuk from './SuratMasuk';
import SuratKeluar from './SuratKeluar';
import SKTugasPersonel from './SKTugasPersonel';

const Dashboard = ({ onLogout }) => {
  return (
    <div>
      {/* Navbar Atas */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/dashboard">Dashboard</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/account">Akun Anda</Link>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-danger nav-link"
                  onClick={onLogout}
                  style={{ border: 'none', background: 'transparent' }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Sidebar dan Konten Utama */}
      <div className="d-flex">
        {/* Sidebar */}
        <nav className="bg-dark text-white p-3 vh-100" style={{ width: '250px' }}>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link text-white">Beranda</Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/bagian-divisi" className="nav-link text-white">Bagian/Divisi</Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/pegawai" className="nav-link text-white">Pegawai</Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/surat-masuk" className="nav-link text-white">Surat Masuk</Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/surat-keluar" className="nav-link text-white">Surat Keluar</Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/sk-tugas-personel" className="nav-link text-white">SK Tugas Personel</Link>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="flex-grow-1 p-4 bg-light">
          <Routes>
            <Route path="/" element={<h1>Beranda</h1>} />
            <Route path="bagian-divisi" element={<BagianDivisi />} />
            <Route path="pegawai" element={<Pegawai />} />
            <Route path="surat-masuk" element={<SuratMasuk />} />
            <Route path="surat-keluar" element={<SuratKeluar />} />
            <Route path="sk-tugas-personel" element={<SKTugasPersonel />} />
            {/* Halaman Akun Anda */}
            <Route path="account" element={<h1>Akun Anda</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
