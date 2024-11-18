import React, { useState } from 'react';

const SuratMasuk = () => {
  const [data, setData] = useState([
    {
      kode: '001',
      tanggal: '2024-01-01',
      asalSurat: 'PT ABC',
      nrpPegawai: '123456',
      softfile: { name: 'contoh.pdf', url: null },
      jenisSurat: 'Biasa',
    },
  ]);

  const [formData, setFormData] = useState({
    kode: '',
    tanggal: '',
    asalSurat: '',
    nrpPegawai: '',
    softfile: null,
    jenisSurat: 'Biasa',
  });

  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

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
    if (editIndex !== null) {
      const updatedData = [...data];
      updatedData[editIndex] = formData;
      setData(updatedData);
      setEditIndex(null);
    } else {
      setData([...data, formData]);
    }
    setFormData({
      kode: '',
      tanggal: '',
      asalSurat: '',
      nrpPegawai: '',
      softfile: null,
      jenisSurat: 'Biasa',
    });
    setShowForm(false);
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(data[index]);
    setShowForm(true);
  };

  const handleDownload = () => {
    const headers = [
      'Kode Transaksi',
      'Tanggal',
      'Asal Surat',
      'NRP Pegawai',
      'Softfile',
      'Jenis Surat',
    ];
    const rows = data.map((item) => [
      item.kode,
      item.tanggal,
      item.asalSurat,
      item.nrpPegawai,
      item.softfile?.name || '',
      item.jenisSurat,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Surat_Masuk_Report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 bg-light" style={{ borderRadius: '8px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Surat Masuk</h2>
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
              setFormData({
                kode: '',
                tanggal: '',
                asalSurat: '',
                nrpPegawai: '',
                softfile: null,
                jenisSurat: 'Biasa',
              });
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
            <div className="col-md-2 mb-3">
              <input
                type="text"
                className="form-control"
                name="kode"
                placeholder="Kode Transaksi"
                value={formData.kode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-2 mb-3">
              <input
                type="date"
                className="form-control"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-2 mb-3">
              <input
                type="text"
                className="form-control"
                name="asalSurat"
                placeholder="Asal Surat"
                value={formData.asalSurat}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-2 mb-3">
              <input
                type="text"
                className="form-control"
                name="nrpPegawai"
                placeholder="NRP Pegawai"
                value={formData.nrpPegawai}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-2 mb-3">
              <input
                type="file"
                className="form-control"
                onChange={handleFileChange}
                required={!editIndex} // File wajib diunggah hanya untuk tambah data
              />
            </div>
            <div className="col-md-2 mb-3">
              <select
                className="form-control"
                name="jenisSurat"
                value={formData.jenisSurat}
                onChange={handleChange}
              >
                <option value="Biasa">Biasa</option>
                <option value="Penting">Penting</option>
                <option value="Rahasia">Rahasia</option>
              </select>
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
              <th>Kode Transaksi</th>
              <th>Tanggal</th>
              <th>Asal Surat</th>
              <th>NRP Pegawai</th>
              <th>Softfile</th>
              <th>Jenis Surat</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.kode}</td>
                <td>{item.tanggal}</td>
                <td>{item.asalSurat}</td>
                <td>{item.nrpPegawai}</td>
                <td>
                  {item.softfile?.url ? (
                    <a href={item.softfile.url} target="_blank" rel="noreferrer">
                      View
                    </a>
                  ) : (
                    'No File'
                  )}
                </td>
                <td>{item.jenisSurat}</td>
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

export default SuratMasuk;
