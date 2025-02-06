import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const Login = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Menggunakan useNavigate untuk redirect

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://arsipdigital-v2.my.id/api/admin/login_admin.php', {
        email,
        password,
      });
      console.log(response.data); // Debug respon API
      if (response.data.status === "success") {
        // Simpan token ke local storage
        localStorage.setItem('token', response.data.token);
      
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setError(response.data.message || 'Login gagal. Coba lagi.');
      }
      
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundColor: '#333', // Background item gelap
      }}
    >
      <div className="d-flex w-100" style={{ maxWidth: '1900px' }}>
        {/* Kotak gambar di sebelah kiri */}
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            width: '50%', // Menetapkan lebar gambar menjadi 50% dari container
            height: '110vh',
            backgroundColor: '#444',
            position: 'relative',
          }}
        >
          <img
            src="/src2.png" // Gambar di samping
            alt="Login Background"
            className="img-fluid"
            style={{
              width: '900%',
              height: '100%',
              objectFit: 'cover', // Menjaga agar gambar tidak terdistorsi
            }}
          />
        </div>

        {/* Kotak form login di sebelah kanan */}
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{
            width: '50%', // Form login di sebelah kanan dengan lebar 50%
            backgroundColor: '#2c2c2c',
            border: 'none',
            marginTop: '2px', // Menambahkan margin agar form lebih ke bawah
            borderTopLeftRadius: '0',
            borderBottomLeftRadius: '0',
            position: 'relative',
            padding: '40px', // Menambah padding untuk memperbesar form
            minHeight: '100vh', // Menjaga agar form selalu menutupi layar
          }}
        >
          {/* Gambar src.png di atas form login */}
          <div
            className="mb-4"
            style={{
              width: '600px', // Lebar gambar src.png lebih besar
              height: '150px',
              overflow: 'hidden',
            }}
          >
            <img
              src="/src.png" // Gambar src.png yang lebih besar
              alt="Logo"
              className="img-fluid"
              style={{
                width: '250%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </div>

          <h3 className="text-center mb-4 text-white">Login</h3>
          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <div className="mb-4">
              <label htmlFor="email" className="form-label text-white">
                Email
              </label>
              <input
                type="email"
                className="form-control bg-dark text-white border-secondary"
                id="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state
                style={{
                  padding: '15px', // Memperbesar ukuran input
                  fontSize: '1.1rem', // Memperbesar ukuran font
                }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label text-white">
                Password
              </label>
              <input
                type="password"
                className="form-control bg-dark text-white border-secondary"
                id="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
                style={{
                  padding: '15px', // Memperbesar ukuran input
                  fontSize: '1.1rem', // Memperbesar ukuran font
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{ padding: '12px', fontSize: '1.1rem' }} // Memperbesar tombol
            >
              Login
            </button>
          </form>
          {error && <p className="text-danger text-center mt-3">{error}</p>} {/* Display error message */}
          <p className="text-center mt-3 text-white">
            Don't have an account?{' '}
            <a href="/register" className="text-primary text-decoration-none">
              Register
            </a>
          </p>
        </div>
      </div>

      {/* Pop-up Login Berhasil */}
      {showSuccess && (
        <div
          className="position-fixed top-50 start-50 translate-middle bg-success text-white p-4 rounded shadow-lg"
          style={{ zIndex: 1050 }}
        >
          <h5 className="text-center mb-3">Login Berhasil!</h5>
          <p className="text-center">Anda akan diarahkan ke halaman utama.</p>
        </div>
      )}
    </div>
  );
};

export default Login;
