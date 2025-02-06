import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const CreateAccountPolisi = () => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    role: 'User', // default role user
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nama, email, password, role } = formData;

    if (!nama || !email || !password || !role) {
      setMessage('Semua field harus diisi!');
      return;
    }

    try {
      // Kirim data ke API
      const response = await axios.post(
        'https://arsipdigital-v2.my.id/api/admin/create_account.php',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const result = await response.data;

      console.log(result)

      if (result.status === 'success') {
        Swal.fire({
          title: 'Berhasil!',
          text: 'Akun polisi berhasil dibuat!',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        // Reset form setelah berhasil
        setFormData({ nama: '', email: '', password: '', role: 'user' });
      } if (result.status === 'error') {
        // Menangani jika ada error di server
        Swal.fire({
          title: 'Error!',
          text: result.message || 'Terjadi kesalahan saat membuat akun.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      // Menangani jika ada error saat melakukan request
      Swal.fire({
        title: 'Error!',
        text: error.response.data.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Create Akun Anggota</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nama</label>
          <input
            type="text"
            className="form-control"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            className="form-control"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Create Akun</button>
      </form>
    </div>
  );
};

export default CreateAccountPolisi;