import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaLock } from 'react-icons/fa';
import SEO from '../../components/SEO';

export default function Login() {
  const { login, admin, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (admin) {
      navigate('/admin', { replace: true });
    }
  }, [admin, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO title="Admin Login" description="Admin login page" path="/admin/login" />
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <FaLock className="text-4xl text-gray-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white">Admin Login</h1>
            <p className="text-gray-400 mt-2">Enter your credentials to access the dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-4">
            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/20"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/20"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {submitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
