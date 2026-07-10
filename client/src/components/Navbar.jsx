import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaUserLock } from 'react-icons/fa';

const navLinks = [
  { path: '/frontend-projects', label: 'Frontend' },
  { path: '/fullstack-projects', label: 'Fullstack' },
  { path: '/ai-projects', label: 'AI' },
  { path: '/resume', label: 'Resume' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-shadow">
            F
          </div>
          <span className="text-base sm:text-lg font-semibold text-white tracking-tight">
            Faizan
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                location.pathname === link.path
                  ? 'text-white bg-white/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* GitHub + LinkedIn Icons */}
          <a
            href="https://github.com"
            rel="noopener noreferrer"
            className="ml-2 w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="GitHub"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="https://linkedin.com"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={18} />
          </a>

          {/* Admin Login */}
          <Link
            to="/admin/login"
            className="ml-1 w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:bg-white/10 transition-colors"
            aria-label="Admin"
            title="Admin Login"
          >
            <FaUserLock size={16} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg text-sm transition-colors ${
                    location.pathname === link.path
                      ? 'text-white bg-white/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-3 pt-3 px-4">
                <a href="https://github.com" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white"><FaGithub size={18} /></a>
                <a href="https://linkedin.com" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white"><FaLinkedin size={18} /></a>
                <Link to="/admin/login" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-orange-400" title="Admin Login"><FaUserLock size={16} /></Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
