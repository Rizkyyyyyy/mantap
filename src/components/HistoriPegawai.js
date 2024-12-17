import React, { useState } from 'react';

const Pegawai = () => {
  const [data, setData] = useState([
    {
      nrp: '123456',
      nama: 'John Doe',
      email: 'johndoe@example.com',
      noHp: '08123456789',
      kodeBagian: '001',
      status: 'Kenaikan pangkat',
      sebelum: 'AKP',
      sesudah: 'Kombes',
      jabatan: 'Kapolres',
      deskripsi: 'Bertanggung jawab atas Polres.',
      tanggal: '2024-01-01',
    },
  ]);

  const [formData, setFormData] = useState({
    nrp: '',
    nama: '',
    email: '',
    noHp: '',
    kodeBagian: '',
    sebelum: '',
    sesudah: '',
    jabatan: '',
    deskripsi: '',
    status: '',
    tanggal: '',
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
      nrp: '',
      nama: '',
      email: '',
      noHp: '',
      kodeBagian: '',
      sebelum: '',
      sesudah: '',
      jabatan: '',
      deskripsi: '',
      status: '',
      tanggal: '',
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
      'NRP Pegawai',
      'Nama Pegawai',
      'Email',
      'No HP',
      'Kode Bagian',
      'Pangkat Sebelum',
      'Pangkat Sesudah',
      'Jabatan',
      'Deskripsi Umum',
      'Status',
      'Tanggal Perubahan',
    ];
    const rows = data.map((item) => [
      item.nrp,
      item.nama,
      item.email,
      item.noHp,
      item.kodeBagian,
      item.sebelum,
      item.sesudah,
      item.jabatan,
      item.deskripsi,
      item.status,
      item.tanggal,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Pegawai_Report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 bg-light" style={{ borderRadius: '8px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Histori Pegawai</h2>
        <div>
          <button className="btn btn-outline-primary me-2" onClick={handleDownload}>
            Download Report
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowForm(!showForm);
              setFormData({
                nrp: '',
                nama: '',
                email: '',
                noHp: '',
                kodeBagian: '',
                sebelum: '',
                sesudah: '',
                jabatan: '',
                deskripsi: '',
                status: '',
                tanggal: '',
              });
              setEditIndex(null);
            }}
          >
            {showForm ? 'Cancel' : '+ Add'}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="mb-4">
          <div className="row">
            <div className="col-md-3 mb-3">
              <input
                type="text"
                className="form-control"
                name="nrp"
                placeholder="NRP Pegawai"
                value={formData.nrp}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <input
                type="text"
                className="form-control"
                name="nama"
                placeholder="Nama Pegawai"
                value={formData.nama}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <input
                type="text"
                className="form-control"
                name="noHp"
                placeholder="No HP"
                value={formData.noHp}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <input
                type="text"
                className="form-control"
                name="kodeBagian"
                placeholder="Kode Bagian"
                value={formData.kodeBagian}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <select
                className="form-select"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="">Pilih Status</option>
                <option value="Kenaikan jabatan">Kenaikan Jabatan</option>
                <option value="Kenaikan pangkat">Kenaikan Pangkat</option>
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <input
                type="text"
                className="form-control"
                name="sebelum"
                placeholder="Sebelum"
                value={formData.sebelum}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <input
                type="text"
                className="form-control"
                name="sesudah"
                placeholder="Sesudah"
                value={formData.sesudah}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <input
                type="text"
                className="form-control"
                name="deskripsi"
                placeholder="Deskripsi Umum"
                value={formData.deskripsi}
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
          </div>
          <button type="submit" className="btn btn-success">
            {editIndex !== null ? 'Update' : 'Save'}
          </button>
        </form>
      )}

      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>NRP Pegawai</th>
              <th>Nama Pegawai</th>
              <th>Email</th>
              <th>No HP</th>
              <th>Kode Bagian</th>
              <th>Status</th>
              <th>Sebelum</th>
              <th>Sesudah</th>
              <th>Deskripsi Umum</th>
              <th>Tanggal Perubahan</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.nrp}</td>
                <td>{item.nama}</td>
                <td>{item.email}</td>
                <td>{item.noHp}</td>
                <td>{item.kodeBagian}</td>
                <td>{item.status}</td>
                <td>{item.sebelum}</td>
                <td>{item.sesudah}</td>
                <td>{item.deskripsi}</td>
                <td>{item.tanggal}</td>
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
    </div>
  );
};

export default Pegawai;

