import React, { useState } from 'react';
import Swal from 'sweetalert2';

const SKTugasPersonel = () => {
  const [data, setData] = useState([
    {
      id: 1, // Menambahkan ID pertama
      kode: '001',
      tanggal: '2024-01-01',
      nrpPegawai: '123456',
      deskripsi: 'Melaksanakan tugas di bagian IT.',
      softfile: { name: 'sk_tugas.pdf', url: null },
      namapenerima: 'rizky',
    },
  ]);

  const [formData, setFormData] = useState({
    kode_transaksi: '',
    tanggal_sk: '',
    nrp_pegawai: '',
    deskripsi: '',
    softfile: null,
    namapenerima: '',
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
      Swal.fire('Berhasil!', 'Data berhasil diperbarui.', 'success');
    } else {
      // Menambahkan id yang otomatis bertambah
      const newId = data.length ? data[data.length - 1].id + 1 : 1;
      setData([
        ...data,
        { ...formData, id: newId }, // Menambahkan id pada data baru
      ]);
      Swal.fire('Berhasil!', 'Data berhasil ditambahkan.', 'success');
    }
    setFormData({
      kode_transaksi: '',
      tanggal_sk: '',
      nrp_pegawai: '',
      deskripsi: '',
      softfile: null,
      namapenerima: '',
    });
    setShowForm(false);
  };

  const handleDelete = (index) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda tidak dapat mengembalikan data yang dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedData = data.filter((_, i) => i !== index);
        setData(updatedData);
        Swal.fire('Dihapus!', 'Data berhasil dihapus.', 'success');
      }
    });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(data[index]);
    setShowForm(true);
  };

  const handleDownload = () => {
    const headers = ['Kode Transaksi', 'Tanggal SK', 'NRP Pegawai', 'Deskripsi Umum', 'Softfile'];
    const rows = data.map((item) => [
      item.kode_transaksi,
      item.tanggal_sk,
      item.nrp_pegawai,
      item.deskripsi,
      item.softfile?.name || '',
      item.namapenerima,
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
    <div className="p-4 bg-light" style={{ borderRadius: '8px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>SK Tugas Personel</h2>
        <div>
          <button className="btn btn-outline-primary me-2" onClick={handleDownload}>
            Download report
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowForm(!showForm);
              setFormData({
                kode_transaksi: '',
                tanggal_sk: '',
                nrp_pegawai: '',
                deskripsi: '',
                softfile: null,
                namapenerima: '',
              });
              setEditIndex(null);
            }}
          >
            {showForm ? 'Batal' : '+ Add'}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="mb-4">
          <div className="row">
            <div className="col-md-2 mb-3">
              <input
                type="text"
                className="form-control"
                name="kode_transaksi"
                placeholder="Kode Transaksi"
                value={formData.kode_transaksi}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-2 mb-3">
              <input
                type="date"
                className="form-control"
                name="tanggal_sk"
                value={formData.tanggal_sk}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-2 mb-3">
              <input
                type="text"
                className="form-control"
                name="nrp_pegawai"
                placeholder="NRP Pegawai"
                value={formData.nrp_pegawai}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
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
            <div className="col-md-2 mb-3">
              <input
                type="file"
                className="form-control"
                onChange={handleFileChange}
                required={!editIndex}
              />
            </div>
            <div className="col-md-2 mb-3">
              <input
                type="text"
                className="form-control"
                name="namapenerima"
                placeholder="Nama Penerima"
                value={formData.namapenerima}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-success">
            {editIndex !== null ? 'Perbarui' : 'Simpan'}
          </button>
        </form>
      )}

      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Kode Transaksi</th>
              <th>Tanggal SK</th>
              <th>NRP Pegawai</th>
              <th>Deskripsi Umum</th>
              <th>Softfile</th>
              <th>Nama Penerima</th>
              {/* <th>Aksi</th> */}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.kode_transaksi}</td>
                <td>{item.tanggal_sk}</td>
                <td>{item.nrp_pegawai}</td>
                <td>{item.deskripsi}</td>
                <td>
                  {item.softfile?.url ? (
                    <a href={item.softfile.url} target="_blank" rel="noreferrer">
                      Lihat
                    </a>
                  ) : (
                    'Tidak Ada File'
                  )}
                </td>
                <td>{item.namapenerima}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-end">Total: {data.length} dan menampilkan 1 halaman</p>
    </div>
  );
};

export default SKTugasPersonel;
