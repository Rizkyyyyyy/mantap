import React from 'react';

const Register = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <div className="card p-4 shadow-lg" style={{ width: '400px', backgroundColor: '#2c2c2c', border: 'none' }}>
        <h3 className="text-center mb-4 text-white">Register</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-white">Full Name</label>
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary"
              id="name"
              placeholder="Enter your full name"
              style={{ color: 'white' }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">Email</label>
            <input
              type="email"
              className="form-control bg-dark text-white border-secondary"
              id="email"
              placeholder="Enter your email"
              style={{ color: 'white' }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">Password</label>
            <input
              type="password"
              className="form-control bg-dark text-white border-secondary"
              id="password"
              placeholder="Create a password"
              style={{ color: 'white' }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label text-white">Confirm Password</label>
            <input
              type="password"
              className="form-control bg-dark text-white border-secondary"
              id="confirmPassword"
              placeholder="Confirm your password"
              style={{ color: 'white' }}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        <p className="text-center mt-3 text-white">
          Already have an account? <a href="/" className="text-primary text-decoration-none">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
