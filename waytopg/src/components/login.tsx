import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Navbar from './navbar';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.role);
        switch (data.role) {
          case 'student':
            navigate('/user-dashboard');
            break;
          case 'owner':
            navigate('/owner-dashboard');
            break;
          case 'admin':
            navigate('/admin-dashboard');
            break;
          default:
            navigate('/');
        }
      } else {
        setError(data.message || 'An error occurred during login');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login to EcoStay</h2>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                          focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                          focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">I am a:</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm
                          focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              >
                <option value="student">Student</option>
                <option value="owner">Accommodation Owner</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
            <Button type="submit" variant="primary" size="large" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-green-600 hover:text-green-500">
                Sign up
              </Link>
            </p>
            <p className="mt-2">
              <Link to="/forgot-password" className="font-medium text-green-600 hover:text-green-500">
                Forgot your password?
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;