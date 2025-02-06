import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const SKTugasPersonel = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    kode_transaksi: '',
    tanggal_sk: '',
    nrp_pegawai: '',
    deskripsi: '',
    softfile: null,
  });
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const fetchData = async () => {
    try {
      const storedData = localStorage.getItem('sktugasData');
      if (storedData) {
        setData(JSON.parse(storedData));
      } else {
        const response = await fetch('https://arsipdigital-v2.my.id/api/admin/suratsktugas.php', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result && Array.isArray(result.data)) {
          setData(result.data);
          localStorage.setItem('sktugasData', JSON.stringify(result.data));
        } else {
          console.error('Data is not an array or missing');
          setData([]);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        softfile: {
          name: file.name,
          url: URL.createObjectURL(file),
        },
      });
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const method = editIndex !== null ? 'PUT' : 'POST';
    const url = editIndex !== null 
      ? `https://arsipdigital-v2.my.id/api/admin/suratsktugas.php/${data[editIndex].id}` 
      : 'https://arsipdigital-v2.my.id/api/admin/suratsktugas.php';
  
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((result) => {
        let updatedData;
        if (editIndex !== null) {
          updatedData = [...data];
          updatedData[editIndex] = { ...formData, id: updatedData[editIndex].id };
          setEditIndex(null);
        } else {
          updatedData = [...data, { ...formData, id: result.id }];
        }
  
        setData(updatedData);
        localStorage.setItem('sktugasData', JSON.stringify(updatedData));
  
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: editIndex !== null ? 'Data berhasil diperbarui.' : 'Data berhasil ditambahkan.',
          showConfirmButton: false,
          timer: 1500
        });
        
        setFormData({
          kode_transaksi: '',
          tanggal_sk: '',
          nrp_pegawai: '',
          deskripsi: '',
          softfile: null,
        });
        setShowForm(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Terjadi kesalahan! Silakan coba lagi.',
        });
      });
  };

  const handleDownload = () => {
    const headers = ['Kode Transaksi', 'Tanggal SK', 'NRP Pegawai', 'Deskripsi Umum', 'Softfile'];
    const rows = data.map((item) => [
      item.kode_transaksi,
      item.tanggal_sk,
      item.nrp_pegawai,
      item.deskripsi,
      item.softfile?.name || '',
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'SK_Tugas_Personel_Report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container-fluid py-4">
      <div className="card shadow">
        <div className="card-header bg-primary bg-gradient text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">SK Tugas Personel</h5>
            <div>
              <button 
                className="btn btn-outline-light btn-sm me-2" 
                onClick={handleDownload}
              >
                <i className="bi bi-download me-1"></i>
                Download Report
              </button>
              <button
                className="btn btn-light btn-sm"
                onClick={() => {
                  setShowForm(!showForm);
                  setFormData({
                    kode_transaksi: '',
                    tanggal_sk: '',
                    nrp_pegawai: '',
                    deskripsi: '',
                    softfile: null,
                  });
                  setEditIndex(null);
                }}
              >
                <i className={`bi ${showForm ? 'bi-x-lg' : 'bi-plus-lg'} me-1`}></i>
                {showForm ? 'Batal' : 'Tambah Data'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="card-body">
          {showForm && (
            <div className="card mb-4 border-primary">
              <div className="card-header bg-primary bg-opacity-10">
                <h6 className="mb-0">{editIndex !== null ? 'Edit Data' : 'Tambah Data Baru'}</h6>
              </div>
              <div className="card-body">
                <form onSubmit={handleAdd}>
                  <div className="row g-3">
                    <div className="col-md-2">
                      <label className="form-label">Kode Transaksi</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="kode_transaksi"
                        placeholder="Masukkan kode"
                        value={formData.kode_transaksi}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label">Tanggal SK</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        name="tanggal_sk"
                        value={formData.tanggal_sk}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label">NRP Pegawai</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="nrp_pegawai"
                        placeholder="Masukkan NRP"
                        value={formData.nrp_pegawai}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Deskripsi</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="deskripsi"
                        placeholder="Masukkan deskripsi"
                        value={formData.deskripsi}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label">Softfile</label>
                      <input
                        type="file"
                        className="form-control form-control-sm"
                        onChange={handleFileChange}
                        required={!editIndex}
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <button type="submit" className="btn btn-primary btn-sm">
                      <i className="bi bi-save me-1"></i>
                      {editIndex !== null ? 'Perbarui' : 'Simpan'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="table-responsive">
            <table className="table table-hover table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th className="text-center" style={{ width: '5%' }}>ID</th>
                  <th style={{ width: '15%' }}>Kode Transaksi</th>
                  <th style={{ width: '15%' }}>Tanggal SK</th>
                  <th style={{ width: '15%' }}>NRP Pegawai</th>
                  <th style={{ width: '35%' }}>Deskripsi Umum</th>
                  <th className="text-center" style={{ width: '15%' }}>Softfile</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      <i className="bi bi-inbox display-6 d-block mb-2"></i>
                      Tidak ada data untuk ditampilkan.
                    </td>
                  </tr>
                ) : (
                  data.map((item) => (
                    <tr key={item.id}>
                      <td className="text-center">{item.id}</td>
                      <td>{item.kode_transaksi}</td>
                      <td>{item.tanggal_sk}</td>
                      <td>{item.nrp_pegawai}</td>
                      <td>{item.deskripsi}</td>
                      <td className="text-center">
                        {item.softfile?.url ? (
                          <a 
                            href={item.softfile.url} 
                            className="btn btn-outline-primary btn-sm"
                            target="_blank" 
                            rel="noreferrer"
                          >
                            <i className="bi bi-file-earmark-text me-1"></i>
                            Lihat File
                          </a>
                        ) : (
                          <span className="badge bg-secondary">
                            <i className="bi bi-x-circle me-1"></i>
                            Tidak Ada File
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="text-muted small">
              Menampilkan {data.length} data
            </span>
            <nav aria-label="Page navigation">
              <ul className="pagination pagination-sm mb-0">
                <li className="page-item disabled">
                  <span className="page-link">Previous</span>
                </li>
                <li className="page-item active">
                  <span className="page-link">1</span>
                </li>
                <li className="page-item disabled">
                  <span className="page-link">Next</span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SKTugasPersonel;