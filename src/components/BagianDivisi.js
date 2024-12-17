import React, { useState } from 'react';

const BagianDivisi = () => {
  // State untuk menyimpan data bagian/divisi
  const [data, setData] = useState([
    { kode: '001', nama: 'Polantas', tanggal: '2024-01-01', alamat: 'Jl. Raya No. 1' },
    { kode: '002', nama: 'Sabhara', tanggal: '2024-01-02', alamat: 'Jl. Merdeka No. 2' },
    { kode: '003', nama: 'Brimob', tanggal: '2024-01-03', alamat: 'Jl. Teknologi No. 3' },
  ]);

  // State untuk form input
  const [formData, setFormData] = useState({
    kode: '',
    nama: '',
    tanggal: '',
    alamat: '',
  });

  // State untuk menampilkan atau menyembunyikan form Add/Edit
  const [showForm, setShowForm] = useState(false);

  // State untuk menentukan apakah dalam mode Edit
  const [editIndex, setEditIndex] = useState(null);

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fungsi untuk menambahkan atau memperbarui data
  const handleAdd = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // Edit data
      const updatedData = [...data];
      updatedData[editIndex] = formData;
      setData(updatedData);
      setEditIndex(null);
    } else {
      // Tambah data baru
      setData([...data, formData]);
    }
    setFormData({ kode: '', nama: '', tanggal: '', alamat: '' });
    setShowForm(false);
  };

  // Fungsi untuk menghapus data
  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  // Fungsi untuk mengedit data
  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(data[index]);
    setShowForm(true);
  };

  // Fungsi untuk mendownload data sebagai CSV
  const handleDownload = () => {
    const headers = ['Kode Bagian', 'Nama Bagian', 'Tanggal', 'Alamat Kantor'];
    const rows = data.map((item) => [
      item.kode,
      item.nama,
      item.tanggal,
      item.alamat,
    ]);

    // Konversi data menjadi CSV
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    // Buat link untuk download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Bagian_Divisi_Report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 bg-light" style={{ borderRadius: '8px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Bagian/Divisi</h2>
        <div>
          <button
            className="btn btn-outline-primary me-2"
            onClick={handleDownload}
          >
            Download report
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowForm(!showForm);
              setFormData({ kode: '', nama: '', tanggal: '', alamat: '' });
              setEditIndex(null);
            }}
          >
            {showForm ? 'Cancel' : '+ Add'}
          </button>
        </div>
      </div>

      {/* Form Add/Edit */}
      {showForm && (
        <form onSubmit={handleAdd} className="mb-4">
          <div className="row">
            <div className="col-md-3 mb-3">
              <input
                type="text"
                className="form-control"
                name="kode"
                placeholder="Kode Bagian"
                value={formData.kode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <input
                type="text"
                className="form-control"
                name="nama"
                placeholder="Nama Bagian"
                value={formData.nama}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <input
                type="date"
                className="form-control"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <input
                type="text"
                className="form-control"
                name="alamat"
                placeholder="Alamat Kantor"
                value={formData.alamat}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-success">
            {editIndex !== null ? 'Update' : 'Save'}
          </button>
        </form>
      )}

      {/* Tabel Data */}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Kode Bagian</th>
              <th>Nama Bagian</th>
              <th>Tanggal</th>
              <th>Alamat Kantor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.kode}</td>
                <td>{item.nama}</td>
                <td>{item.tanggal}</td>
                <td>{item.alamat}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-end">Total: {data.length} and showing 1 page</p>
    </div>
  );
};

export default BagianDivisi;
