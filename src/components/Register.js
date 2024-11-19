import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPopup, setShowPopup] = useState(false); // Untuk mengontrol pop-up

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Password and Confirm Password do not match!');
      return;
    }

    // Simpan data pengguna ke Local Storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    localStorage.setItem('users', JSON.stringify(users));

    // Tampilkan pop-up
    setShowPopup(true);

    // Setelah beberapa detik, arahkan ke halaman login
    setTimeout(() => {
      setShowPopup(false);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <div className="card p-4 shadow-lg" style={{ width: '400px', backgroundColor: '#2c2c2c', border: 'none' }}>
        <h3 className="text-center mb-4 text-white">Register</h3>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-white">Full Name</label>
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">Email</label>
            <input
              type="email"
              className="form-control bg-dark text-white border-secondary"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">Password</label>
            <input
              type="password"
              className="form-control bg-dark text-white border-secondary"
              id="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label text-white">Confirm Password</label>
            <input
              type="password"
              className="form-control bg-dark text-white border-secondary"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        <p className="text-center mt-3 text-white">
          Already have an account? <a href="/" className="text-primary text-decoration-none">Login</a>
        </p>
      </div>

      {/* Pop-up Registrasi Berhasil */}
      {showPopup && (
        <div
          className="position-fixed top-50 start-50 translate-middle p-4 bg-success text-white rounded shadow-lg"
          style={{ zIndex: 1050, textAlign: 'center' }}
        >
          <h5>Registrasi Berhasil!</h5>
          <p>Anda akan diarahkan ke halaman login.</p>
        </div>
      )}
    </div>
  );
};

export default Register;
