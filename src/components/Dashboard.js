import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import {
  FaSignOutAlt,
  FaUser,
  FaHome,
  FaBuilding,
  FaUsers,
  FaEnvelope,
  FaFileAlt,
  FaClipboardList,
} from 'react-icons/fa'; // Ikon untuk sidebar
import BagianDivisi from './BagianDivisi';
import Pegawai from './Pegawai';
import SuratMasuk from './SuratMasuk';
import SuratKeluar from './SuratKeluar';
import SKTugasPersonel from './SKTugasPersonel';
import CreateAccountPolisi from './CreateAccountPolisi';

const Dashboard = ({ onLogout }) => {
  const location = useLocation();

  // State untuk menyimpan total pegawai, surat masuk, surat keluar
  const [totalPegawai, setTotalPegawai] = useState(0);
  const [totalSuratMasuk, setTotalSuratMasuk] = useState(0);
  const [totalSuratKeluar, setTotalSuratKeluar] = useState(0);

  // Fungsi untuk menentukan apakah menu aktif
  const isActive = (path) => location.pathname === path;

  // Simulasi mengambil data total pegawai, surat masuk, surat keluar dari server
  useEffect(() => {
    // Contoh data yang diambil, Anda bisa ganti dengan API fetch sebenarnya
    setTotalPegawai(50); // Misalnya ada 50 pegawai
    setTotalSuratMasuk(120); // Misalnya ada 120 surat masuk
    setTotalSuratKeluar(80); // Misalnya ada 80 surat keluar
  }, []);

  // Fungsi logout dengan konfirmasi menggunakan SweetAlert2
  const handleLogout = () => {
    Swal.fire({
      title: 'Anda yakin ingin keluar?',
      text: "Anda akan keluar dari sesi ini.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, keluar',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Logged out', 'Anda telah keluar dari sesi.', 'success');
        onLogout(); // Lanjutkan logout jika pengguna mengkonfirmasi
      }
    });
  };

  return (
    <div>
      {/* Navbar Atas */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/dashboard">
            <FaHome className="me-2" /> Dashboard
          </Link>
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
                <Link className="nav-link" to="/dashboard/account">
                  <FaUser className="me-2" /> Akun Anda
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="btn nav-link text-danger"
                  onClick={handleLogout}
                  style={{ border: 'none', background: 'transparent' }}
                >
                  <FaSignOutAlt className="me-2" /> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Sidebar dan Konten Utama */}
      <div className="d-flex">
        {/* Sidebar */}
        <nav className="bg-dark text-white p-3 vh-100 shadow" style={{ width: '250px' }}>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link
                to="/dashboard"
                className={`nav-link ${isActive('/dashboard') ? 'active bg-primary text-white' : 'text-white'}`}
              >
                <FaHome className="me-2" /> Beranda
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/dashboard/bagian-divisi"
                className={`nav-link ${isActive('/dashboard/bagian-divisi') ? 'active bg-primary text-white' : 'text-white'}`}
              >
                <FaBuilding className="me-2" /> Bagian/Divisi
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/dashboard/pegawai"
                className={`nav-link ${isActive('/dashboard/pegawai') ? 'active bg-primary text-white' : 'text-white'}`}
              >
                <FaUsers className="me-2" /> Pegawai
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/dashboard/surat-masuk"
                className={`nav-link ${isActive('/dashboard/surat-masuk') ? 'active bg-primary text-white' : 'text-white'}`}
              >
                <FaEnvelope className="me-2" /> Surat Masuk
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/dashboard/surat-keluar"
                className={`nav-link ${isActive('/dashboard/surat-keluar') ? 'active bg-primary text-white' : 'text-white'}`}
              >
                <FaFileAlt className="me-2" /> Surat Keluar
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/dashboard/sk-tugas-personel"
                className={`nav-link ${isActive('/dashboard/sk-tugas-personel') ? 'active bg-primary text-white' : 'text-white'}`}
              >
                <FaClipboardList className="me-2" /> SK Tugas Personel
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/dashboard/create-account-polisi"
                className={`nav-link ${isActive('/dashboard/create-account-polisi') ? 'active bg-primary text-white' : 'text-white'}`}
              >
                <FaUser className="me-2" /> Create Akun
              </Link>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="flex-grow-1 p-4 bg-light">
          <div className="container bg-white p-4 shadow-sm rounded">
            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    <h1>Beranda</h1>
                    <div className="row mt-4">
                      <div className="col-md-4">
                        <div className="card bg-primary text-white mb-4 shadow-sm">
                          <div className="card-body">
                            <h5>Total Pegawai</h5>
                            <h2>{totalPegawai}</h2>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card bg-success text-white mb-4 shadow-sm">
                          <div className="card-body">
                            <h5>Total Surat Masuk</h5>
                            <h2>{totalSuratMasuk}</h2>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card bg-danger text-white mb-4 shadow-sm">
                          <div className="card-body">
                            <h5>Total Surat Keluar</h5>
                            <h2>{totalSuratKeluar}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              />
              <Route path="bagian-divisi" element={<BagianDivisi />} />
              <Route path="pegawai" element={<Pegawai />} />
              <Route path="surat-masuk" element={<SuratMasuk />} />
              <Route path="surat-keluar" element={<SuratKeluar />} />
              <Route path="sk-tugas-personel" element={<SKTugasPersonel />} />
              <Route path="create-account-polisi" element={<CreateAccountPolisi />} />
              <Route path="account" element={<h1>Akun Anda</h1>} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
