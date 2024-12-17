import React from 'react';

const Sidebar = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white" style={{ width: '250px', height: '100vh' }}>
      <h5 className="text-center mb-4">Menu</h5>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="#" className="nav-link text-white active">
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            Bagian/Divisi
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            Pegawai
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            Histori Pegawai
          </a>
        <li>
          <a href="#" className="nav-link text-white">
            Surat Masuk
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            Surat Keluar
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            SK Tugas Personel
          </a>
        </li>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
