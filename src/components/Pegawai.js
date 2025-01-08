import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Pegawai = () => {
  const [data, setData] = useState([
    {
      nrp: '123456',
      nama: 'John Doe',
      email: 'johndoe@example.com',
      noHp: '08123456789',
      kodeBagian: '001',
      pangkat: 'Manager',
      jabatan: 'Kepala Divisi',
      deskripsi: 'Bertanggung jawab atas administrasi.',
    },
  ]);

  const [formData, setFormData] = useState({
    nrp: '',
    nama: '',
    email: '',
    noHp: '',
    kodeBagian: '',
    pangkat: '',
    jabatan: '',
    deskripsi: '',
  });

  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (editIndex === null && data.some((item) => item.nrp === formData.nrp)) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'NRP Pegawai sudah ada, gunakan NRP yang berbeda.',
      });
      return;
    }

    if (editIndex !== null) {
      const updatedData = [...data];
      updatedData[editIndex] = formData;
      setData(updatedData);

      MySwal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Data pegawai berhasil diperbarui!',
      });

      setEditIndex(null);
    } else {
      setData([...data, formData]);

      MySwal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Data pegawai berhasil ditambahkan!',
      });
    }

    setFormData({
      nrp: '',
      nama: '',
      email: '',
      noHp: '',
      kodeBagian: '',
      pangkat: '',
      jabatan: '',
      deskripsi: '',
    });
    setShowForm(false);
  };

  const handleDelete = (index) => {
    MySwal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data pegawai ini akan dihapus secara permanen!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedData = data.filter((_, i) => i !== index);
        setData(updatedData);

        MySwal.fire('Dihapus!', 'Data pegawai berhasil dihapus.', 'success');
      }
    });
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
      'Pangkat',
      'Jabatan',
      'Deskripsi Umum',
    ];
    const rows = data.map((item) => [
      item.nrp,
      item.nama,
      item.email,
      item.noHp,
      item.kodeBagian,
      item.pangkat,
      item.jabatan,
      item.deskripsi,
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
        <h2>Pegawai</h2>
        <div>
          <button className="btn btn-outline-primary me-2" onClick={handleDownload}>
            Download report
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
                pangkat: '',
                jabatan: '',
                deskripsi: '',
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
            <div className="col-md-3 mb-3">
              <input
                type="text"
                className="form-control"
                name="nrp"
                placeholder="NRP Pegawai"
                value={formData.nrp}
                onChange={handleChange}
                required
                disabled={editIndex !== null}
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
              <input
                type="text"
                className="form-control"
                name="pangkat"
                placeholder="Pangkat"
                value={formData.pangkat}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <input
                type="text"
                className="form-control"
                name="jabatan"
                placeholder="Jabatan"
                value={formData.jabatan}
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
          </div>
          <button type="submit" className="btn btn-success">
            {editIndex !== null ? 'Update' : 'Save'}
          </button>
        </form>
      )}

      {/* Table Data */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>NRP Pegawai</th>
              <th>Nama Pegawai</th>
              <th>Email</th>
              <th>No HP</th>
              <th>Kode Bagian</th>
              <th>Pangkat</th>
              <th>Jabatan</th>
              <th>Deskripsi Umum</th>
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
                <td>{item.pangkat}</td>
                <td>{item.jabatan}</td>
                <td>{item.deskripsi}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(index)}>
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
