import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Swal from 'sweetalert2';
import {
  FaSignOutAlt,
  FaUser,
  FaHome,
  FaBuilding,
  FaUsers,
  FaEnvelope,
  FaFileAlt,
  FaClipboardList,
} from 'react-icons/fa';

import BagianDivisi from './BagianDivisi';
import Pegawai from './Pegawai';
import SuratMasuk from './SuratMasuk';
import SuratKeluar from './SuratKeluar';
import SKTugasPersonel from './SKTugasPersonel';
import CreateAccountPolisi from './CreateAccountPolisi';
import ActivityLog from './ActivityLog';

const Dashboard = ({ onLogout }) => {
  const location = useLocation();

  const [totalPegawai, setTotalPegawai] = useState(50);
  const [totalSuratMasuk, setTotalSuratMasuk] = useState(120);
  const [totalSuratKeluar, setTotalSuratKeluar] = useState(80);
  const [totalBagian, setTotalBagian] = useState(10);
  const [totalSKTugasPersonel, setTotalSKTugasPersonel] = useState(40);

  const [descriptions, setDescriptions] = useState({
    bagian: 'Deskripsi untuk Bagian/Divisi',
    pegawai: 'Deskripsi untuk Pegawai',
    suratMasuk: 'Deskripsi untuk Surat Masuk',
    suratKeluar: 'Deskripsi untuk Surat Keluar',
    skTugasPersonel: 'Deskripsi untuk SK Tugas Personel',
  });

  const [showModal, setShowModal] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleShowModal = (type) => {
    setEditValue(descriptions[type]);
    setShowModal(type);
  };

  const handleCloseModal = () => {
    setShowModal(null);
    setEditValue('');
  };

  const handleSaveChanges = () => {
    setDescriptions({
      ...descriptions,
      [showModal]: editValue,
    });
    handleCloseModal();
    Swal.fire('Sukses', 'Deskripsi berhasil diperbarui.', 'success');
  };

  const handleDelete = () => {
    setDescriptions({
      ...descriptions,
      [showModal]: '',
    });
    handleCloseModal();
    Swal.fire('Dihapus', 'Deskripsi berhasil dihapus.', 'success');
  };
  

  const handleLogout = () => {
    Swal.fire({
      title: 'Anda yakin ingin keluar?',
      text: 'Anda akan keluar dari sesi ini.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, keluar',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Logged out', 'Anda telah keluar dari sesi.', 'success');
        onLogout();
      }
    });
  };

  return (
    <div>
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

      <div className="d-flex">
        <nav className="bg-dark text-white p-3 vh-100 shadow" style={{ width: '250px' }}>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link
                to="/dashboard"
                className={`nav-link ${location.pathname === '/dashboard' ? 'active bg-primary text-white' : 'text-white'}`}
              >
                <FaHome className="me-2" /> Beranda
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/dashboard/bagian-divisi"
                className={`nav-link ${location.pathname === '/dashboard/bagian-divisi' ? 'active bg-primary text-white' : 'text-white'}`}
              >
                <FaBuilding className="me-2" /> Bagian/Divisi
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/dashboard/pegawai"
                className={`nav-link ${location.pathname === '/dashboard/pegawai' ? 'active bg-primary text-white' : 'text-white'}`}
              >
                <FaUsers className="me-2" /> Pegawai
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/dashboard/surat-masuk"
                className={`nav-link ${location.pathname === '/dashboard/surat-masuk' ? 'active bg-primary text-white' : 'text-white'}`}
              >
                <FaEnvelope className="me-2" /> Surat Masuk
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/dashboard/surat-keluar"
                className={`nav-link ${location.pathname === '/dashboard/surat-keluar' ? 'active bg-primary text-white' : 'text-white'}`}
              >
                <FaFileAlt className="me-2" /> Surat Keluar
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/dashboard/sk-tugas-personel"
                className={`nav-link ${location.pathname === '/dashboard/sk-tugas-personel' ? 'active bg-primary text-white' : 'text-white'}`}
              >
                <FaClipboardList className="me-2" /> SK Tugas Personel
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/dashboard/create-account-polisi"
                className={`nav-link ${location.pathname === '/dashboard/create-account-polisi' ? 'active bg-primary text-white' : 'text-white'}`}
              >
                <FaClipboardList className="me-2" /> Create Akun
              </Link>
            </li>
            <li className="nav-item">
            <Link
              to="/dashboard/activity-log"
              className={`nav-link ${location.pathname === '/dashboard/activity-log' ? 'active bg-primary text-white' : 'text-white'}`}
            >
              <FaClipboardList className="me-2" /> Log Aktivitas
            </Link>
          </li>
          </ul>
        </nav>

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
                        <div className="card bg-warning text-white mb-4 shadow-sm" style={{ height: '200px' }}>
                          <div className="card-body d-flex flex-column justify-content-between">
                            <div>
                              <h5>Total Bagian / Divisi</h5>
                              <h2>{totalBagian}</h2>
                              <p>{descriptions.bagian}</p>
                            </div>
                            <button
                              className="btn btn-light text-dark mt-3"
                              data-bs-toggle="modal"
                              data-bs-target="#modalDetail"
                              onClick={() => handleShowModal('bagian')}
                            >
                              Lihat Detail
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card bg-primary text-white mb-4 shadow-sm" style={{ height: '200px' }}>
                          <div className="card-body d-flex flex-column justify-content-between">
                            <div>
                              <h5>Total Pegawai</h5>
                              <h2>{totalPegawai}</h2>
                              <p>{descriptions.pegawai}</p>
                            </div>
                            <button
                              className="btn btn-light text-dark mt-3"
                              data-bs-toggle="modal"
                              data-bs-target="#modalDetail"
                              onClick={() => handleShowModal('pegawai')}
                            >
                              Lihat Detail
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card bg-danger text-white mb-4 shadow-sm" style={{ height: '200px' }}>
                          <div className="card-body d-flex flex-column justify-content-between">
                            <div>
                              <h5>Total Surat Masuk</h5>
                              <h2>{totalSuratMasuk}</h2>
                              <p>{descriptions.suratMasuk}</p>
                            </div>
                            <button
                              className="btn btn-light text-dark mt-3"
                              data-bs-toggle="modal"
                              data-bs-target="#modalDetail"
                              onClick={() => handleShowModal('suratMasuk')}
                            >
                              Lihat Detail
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card bg-success text-white mb-4 shadow-sm" style={{ height: '200px' }}>
                          <div className="card-body d-flex flex-column justify-content-between">
                            <div>
                              <h5>Total Surat Keluar</h5>
                              <h2>{totalSuratKeluar}</h2>
                              <p>{descriptions.suratKeluar}</p>
                            </div>
                            <button
                              className="btn btn-light text-dark mt-3"
                              data-bs-toggle="modal"
                              data-bs-target="#modalDetail"
                              onClick={() => handleShowModal('suratKeluar')}
                            >
                              Lihat Detail
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card bg-info text-white mb-4 shadow-sm" style={{ height: '200px' }}>
                          <div className="card-body d-flex flex-column justify-content-between">
                            <div>
                              <h5>Total SK Tugas Personel</h5>
                              <h2>{totalSKTugasPersonel}</h2>
                              <p>{descriptions.skTugasPersonel}</p>
                            </div>
                            <button
                              className="btn btn-light text-dark mt-3"
                              data-bs-toggle="modal"
                              data-bs-target="#modalDetail"
                              onClick={() => handleShowModal('skTugasPersonel')}
                            >
                              Lihat Detail
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/bagian-divisi" element={<BagianDivisi />} />
              <Route path="/pegawai" element={<Pegawai />} />
              <Route path="/surat-masuk" element={<SuratMasuk />} />
              <Route path="/surat-keluar" element={<SuratKeluar />} />
              <Route path="/sk-tugas-personel" element={<SKTugasPersonel />} />
              <Route path="create-account-polisi" element={<CreateAccountPolisi />} />
              <Route path="/activity-log" element={<ActivityLog />} />
               {/* Rute anak lainnya */}
            </Routes>
          </div>
        </div>
      </div>

      {/* Modal untuk edit dan hapus */}
      <div className="modal fade" id="modalDetail" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">
                Edit Deskripsi {showModal === 'bagian' && 'Bagian/Divisi'}
                {showModal === 'pegawai' && 'Pegawai'}
                {showModal === 'suratMasuk' && 'Surat Masuk'}
                {showModal === 'suratKeluar' && 'Surat Keluar'}
                {showModal === 'skTugasPersonel' && 'SK Tugas Personel'}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <label htmlFor="editValue">Edit Deskripsi</label>
              <textarea
                id="editValue"
                className="form-control"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>
                Tutup
              </button>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>
                Hapus
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
