import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Navbar from './navbar';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [companyName, setCompanyName] = useState('');
  const [businessRegistration, setBusinessRegistration] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          companyName: role === 'owner' ? companyName : undefined,
          businessRegistration: role === 'owner' ? businessRegistration : undefined,
          adminCode: role === 'admin' ? adminCode : undefined,
        }),
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
        alert(data.message);
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign up for EcoStay</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                          focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>
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
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            {role === 'owner' && (
              <>
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                              focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="businessRegistration" className="block text-sm font-medium text-gray-700">Business Registration Number</label>
                  <input
                    type="text"
                    id="businessRegistration"
                    value={businessRegistration}
                    onChange={(e) => setBusinessRegistration(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                              focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </>
            )}
            {role === 'admin' && (
              <div>
                <label htmlFor="adminCode" className="block text-sm font-medium text-gray-700">Admin Access Code</label>
                <input
                  type="text"
                  id="adminCode"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                            focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>
            )}
            <Button type="submit" variant="primary" size="large" className="w-full">
              Sign Up
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
              Log in
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignupPage;