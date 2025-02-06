import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Pegawai = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    nrp_pegawai: '',
    nama: '',
    email: '',
    nomor_hp: '',
    kode_bagian: '',
    pangkat: '',
    jabatan: '',
    deskripsi: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const apiUrl = 'https://arsipdigital-v2.my.id/api/admin/pegawai.php';

  const getHeaderAuth = () => ({
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl, getHeaderAuth());
      console.log("Fetched data:", response.data.data);  // Log data fetched from API
      if (response.data && response.data.data) {
        setData(response.data.data);
      } else {
        MySwal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Gagal mengambil data pegawai',
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);  // Log any fetch error
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Gagal mengambil data pegawai',
      });
    }
  };
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editIndex === null) {
        // Menambahkan pegawai
        response = await axios.post(apiUrl, formData, getHeaderAuth());
      } else {
        const updatedData = { ...formData, id: data[editIndex].id };
        // Memperbarui pegawai
        response = await axios.put(apiUrl, updatedData, getHeaderAuth());
      }
  
      console.log("Response after saving:", response);  // Log the full response to check data
      MySwal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: `Data pegawai ${editIndex === null ? 'berhasil ditambahkan' : 'berhasil diperbarui'}`,
      });
  
      if (response.data && response.data.data) {
        // Jika API mengembalikan data yang baru, update state dengan data tersebut
        setData(response.data.data);
      } else {
        // Jika API tidak mengembalikan data, lakukan fetch ulang
        await fetchData();
      }
  
      resetForm();
    } catch (error) {
      console.error("Error during save:", error);  // Log any error here
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Gagal menyimpan data pegawai',
      });
    }
  };
  
  


  const handleDelete = async (index) => {
    const result = await MySwal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${apiUrl}?id=${data[index].id}`, getHeaderAuth());
        await fetchData();
        MySwal.fire(
          'Terhapus!',
          'Data pegawai telah dihapus.',
          'success'
        );
      } catch (error) {
        MySwal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Gagal menghapus data pegawai',
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nrp_pegawai: '',
      nama: '',
      email: '',
      nomor_hp: '',
      kode_bagian: '',
      pangkat: '',
      jabatan: '',
      deskripsi: '',
    });
    setShowForm(false);
    setEditIndex(null);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="container-fluid p-4">
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Data Pegawai</h5>
          <button 
            className={`btn ${showForm ? 'btn-danger' : 'btn-light'}`}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Batal' : '+ Tambah Pegawai'}
          </button>
        </div>
        
        <div className="card-body">
          {showForm && (
            <form onSubmit={handleAdd} className="mb-4">
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="nrp_pegawai"
                    value={formData.nrp_pegawai}
                    onChange={handleChange}
                    placeholder="NRP Pegawai"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    placeholder="Nama Pegawai"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Alamat Email"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="nomor_hp"
                    value={formData.nomor_hp}
                    onChange={handleChange}
                    placeholder="Nomor HP"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="kode_bagian"
                    value={formData.kode_bagian}
                    onChange={handleChange}
                    placeholder="Kode Bagian"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="pangkat"
                    value={formData.pangkat}
                    onChange={handleChange}
                    placeholder="Pangkat"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="jabatan"
                    value={formData.jabatan}
                    onChange={handleChange}
                    placeholder="Jabatan"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleChange}
                    placeholder="Deskripsi"
                  />
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-success">
                    {editIndex !== null ? 'Perbarui' : 'Simpan'}
                  </button>
                </div>
              </div>
            </form>
          )}

          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>NRP</th>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>No. HP</th>
                  <th>Bagian</th>
                  <th>Pangkat</th>
                  <th>Jabatan</th>
                  <th>Deskripsi</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.nrp_pegawai}</td>
                    <td>{item.nama}</td>
                    <td>{item.email}</td>
                    <td>{item.nomor_hp}</td>
                    <td>{item.kode_bagian}</td>
                    <td>{item.pangkat}</td>
                    <td>{item.jabatan}</td>
                    <td>{item.deskripsi}</td>
                    <td>
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => {
                            setEditIndex(index);
                            setFormData(item);
                            setShowForm(true);
                          }}
                        >
                          Ubah
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(index)}
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <nav className="d-flex justify-content-center mt-3">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                >
                  Sebelumnya
                </button>
              </li>
              {Array.from({ length: pageCount }, (_, i) => i + 1).map(number => (
                <li
                  key={number}
                  className={`page-item ${currentPage === number ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(number)}
                  >
                    {number}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === pageCount ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(p => Math.min(pageCount, p + 1))}
                >
                  Selanjutnya
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pegawai;