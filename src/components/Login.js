import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [showSuccess, setShowSuccess] = useState(false);

  // Fungsi untuk menangani login
  const handleLogin = (e) => {
    e.preventDefault();
    setShowSuccess(true); // Tampilkan pop-up login berhasil
    setTimeout(() => {
      onLogin(); // Pindah ke halaman berikutnya setelah 1,5 detik
    }, 1500);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <div className="card p-4 shadow-lg" style={{ width: '400px', backgroundColor: '#2c2c2c', border: 'none' }}>
        <h3 className="text-center mb-4 text-white">Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">Email</label>
            <input
              type="email"
              className="form-control bg-dark text-white border-secondary"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">Password</label>
            <input
              type="password"
              className="form-control bg-dark text-white border-secondary"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="text-center mt-3 text-white">
          Don't have an account? <a href="/register" className="text-primary text-decoration-none">Register</a>
        </p>
      </div>

      {/* Pop-up Login Berhasil */}
      {showSuccess && (
        <div className="position-fixed top-50 start-50 translate-middle bg-success text-white p-4 rounded shadow-lg" style={{ zIndex: 1050 }}>
          <h5 className="text-center mb-3">Login Berhasil!</h5>
          <p className="text-center">Anda akan diarahkan ke halaman utama.</p>
        </div>
      )}
    </div>
  );
};

export default Login;
