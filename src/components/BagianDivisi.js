import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';

const MySwal = withReactContent(Swal);

const BagianDivisi = () => {
  const [dataDivisi, setDataDivisi] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    kode_divisi: '',
    nama_divisi: '',
    alamat_kantor: '',
  });

  const [tampilkanForm, setTampilkanForm] = useState(false);
  const [indeksEdit, setIndeksEdit] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // You can adjust this value as needed

  const apiUrl = 'https://arsipdigital-v2.my.id/api/admin/divisi.php';

  const getHeaderAuth = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
  };

  useEffect(() => {
    axios.get(apiUrl, getHeaderAuth())
      .then((res) => {
        const divisi = res.data.data.map(item => ({
          id: item.id,
          kode_divisi: item.kode_divisi,
          nama_divisi: item.nama_divisi,
          alamat_kantor: item.alamat_kantor,
        }));
        setDataDivisi(divisi);
      })
      .catch((err) => {
        console.error('Gagal mengambil data', err);
        MySwal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: err.response?.data?.pesan || 'Gagal memuat data divisi',
        });
      });
  }, []);

  // Handle perubahan input form
  const handlePerubahanInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!localStorage.getItem('token')) {
      MySwal.fire({
        icon: 'error',
        title: 'Akses Ditolak!',
        text: 'Anda harus login terlebih dahulu',
      });
      return;
    }

    if (indeksEdit === null && Array.isArray(dataDivisi) && dataDivisi.some((item) => item.kode_divisi === formData.kode_divisi)) {
      MySwal.fire({
        icon: 'error',
        title: 'Kode Sudah Ada!',
        text: 'Kode divisi ini sudah digunakan, silakan gunakan kode lain',
      });
      return;
    }

    const request = indeksEdit !== null
      ? axios.put(apiUrl, formData, getHeaderAuth())
      : axios.post(apiUrl, formData, getHeaderAuth());

    request.then((res) => {
      const updatedData = res.data;
      MySwal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: `Data berhasil ${indeksEdit !== null ? 'diperbarui' : 'ditambahkan'}!`,
      });

      axios.get(apiUrl, getHeaderAuth())
        .then((res) => {
          const divisi = res.data.data.map(item => ({
            id: item.id,
            kode_divisi: item.kode_divisi,
            nama_divisi: item.nama_divisi,
            alamat_kantor: item.alamat_kantor,
          }));
          setDataDivisi(divisi);
        })
        .catch((err) => {
          console.error('Gagal mengambil data', err);
          MySwal.fire({
            icon: 'error',
            title: 'Gagal!',
            text: err.response?.data?.pesan || 'Gagal memuat data divisi',
          });
        });

      resetForm();
    })
    .catch((err) => {
      console.error('Gagal menyimpan data', err);
      MySwal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: err.response?.data?.pesan || 'Terjadi kesalahan saat menyimpan data',
      });
    });
  };

  const handleHapus = (indeks) => {
    const idYangDihapus = dataDivisi[indeks].id;

    MySwal.fire({
      title: 'Konfirmasi Hapus',
      text: 'Apakah Anda yakin ingin menghapus data ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    }).then((hasil) => {
      if (hasil.isConfirmed) {
        axios.delete(`${apiUrl}?id=${idYangDihapus}`, getHeaderAuth())
          .then(() => {
            const dataTerbaru = dataDivisi.filter((_, i) => i !== indeks);
            setDataDivisi(dataTerbaru);
            MySwal.fire('Terhapus!', 'Data berhasil dihapus.', 'success');
          })
          .catch((err) => {
            console.error('Gagal menghapus data', err);
            MySwal.fire({
              icon: 'error',
              title: 'Gagal!',
              text: err.response?.data?.pesan || 'Gagal menghapus data',
            });
          });
      }
    });
  };

  const handleEdit = (indeks) => {
    setIndeksEdit(indeks);
    setFormData(dataDivisi[indeks]);
    setTampilkanForm(true);
  };

  const resetForm = () => {
    setTampilkanForm(false);
    setIndeksEdit(null);
    setFormData({ id: null, kode_divisi: '', nama_divisi: '', alamat_kantor: '' });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = dataDivisi.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(dataDivisi.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="p-4 bg-light" style={{ borderRadius: '8px' }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manajemen Divisi</h2>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setTampilkanForm(!tampilkanForm)}
          >
            {tampilkanForm ? (
              <><i className="bi bi-x-circle me-2"></i>Batal</>
            ) : (
              <><i className="bi bi-plus-circle me-2"></i>Tambah</>
            )}
          </button>
        </div>
      </div>

      {/* Form Input */}
      {tampilkanForm && (
        <form onSubmit={handleSubmit} className="mb-4 shadow p-3 bg-white rounded">
          <div className="row g-3 align-items-end">
            <div className="col-md-3">
              <label className="form-label">Kode Divisi</label>
              <input
                type="text"
                className="form-control"
                name="kode_divisi"
                placeholder="DIV-001"
                value={formData.kode_divisi}
                onChange={handlePerubahanInput}
                required
                disabled={indeksEdit !== null}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Nama Divisi</label>
              <input
                type="text"
                className="form-control"
                name="nama_divisi"
                placeholder="Contoh: Divisi IT"
                value={formData.nama_divisi}
                onChange={handlePerubahanInput}
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Alamat Kantor</label>
              <input
                type="text"
                className="form-control"
                name="alamat_kantor"
                placeholder="Alamat lengkap"
                value={formData.alamat_kantor}
                onChange={handlePerubahanInput}
                required
              />
            </div>

            <div className="col-md-2">
              <button 
                type="submit" 
                className="btn btn-success w-100"
              >
                {indeksEdit !== null ? 'Perbarui' : 'Tambah'}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Tabel Data */}
      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr className="bg-primary text-white">
            <th>No</th>
            <th>Kode Divisi</th>
            <th>Nama Divisi</th>
            <th>Alamat Kantor</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1 + indexOfFirstItem}</td>
                <td>{item.kode_divisi}</td>
                <td>{item.nama_divisi}</td>
                <td>{item.alamat_kantor}</td>
                <td>
                  <button 
                    className="btn btn-warning btn-sm me-2" 
                    onClick={() => handleEdit(index)}  
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => handleHapus(index)}  
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Data tidak tersedia</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <nav>
        <ul className="pagination">
          <li className="page-item" onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)}>
            <a className="page-link" href="#">Previous</a>
          </li>
          {pageNumbers.map(number => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <a className="page-link" onClick={() => setCurrentPage(number)}>{number}</a>
            </li>
          ))}
          <li className="page-item" onClick={() => setCurrentPage(currentPage < pageNumbers.length ? currentPage + 1 : currentPage)}>
            <a className="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default BagianDivisi;
