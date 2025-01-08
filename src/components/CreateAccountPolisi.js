import React, { useState } from 'react';
import Swal from 'sweetalert2';

const CreateAccountPolisi = () => {
  const [formData, setFormData] = useState({
    nama: '',
    nrp: '',
    email: '',
    password: '',
    role: 'user', // default role user
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nama, nrp, email, password, role } = formData;

    if (!nama || !nrp || !email || !password || !role) {
      setMessage('Semua field harus diisi!');
      return;
    }

    // Simpan akun ke localStorage (simulasi database)
    const existingAccounts = JSON.parse(localStorage.getItem('polisiAccounts')) || [];
    const isDuplicate = existingAccounts.some((account) => account.nrp === nrp || account.email === email);

    if (isDuplicate) {
      Swal.fire({
        title: 'Error!',
        text: 'NRP atau Email sudah digunakan!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    const newAccount = { nama, nrp, email, password, role };
    existingAccounts.push(newAccount);
    localStorage.setItem('polisiAccounts', JSON.stringify(existingAccounts));

    Swal.fire({
      title: 'Berhasil!',
      text: 'Akun polisi berhasil dibuat!',
      icon: 'success',
      confirmButtonText: 'OK'
    });

    setFormData({ nama: '', nrp: '', email: '', password: '', role: 'user' });
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
          <label className="form-label">NRP</label>
          <input
            type="text"
            className="form-control"
            name="nrp"
            value={formData.nrp}
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
