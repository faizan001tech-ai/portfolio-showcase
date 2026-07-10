import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  HiMenuAlt3, HiX, HiHome, HiFolder, HiLightBulb, HiAcademicCap, HiBriefcase,
  HiCog, HiLogout, HiViewGrid, HiPuzzle, HiArrowLeft,
} from 'react-icons/hi';

const sidebarLinks = [
  { path: '/admin', icon: HiViewGrid, label: 'Dashboard', exact: true },
  { path: '/admin/projects', icon: HiFolder, label: 'Projects' },
  { path: '/admin/skills', icon: HiLightBulb, label: 'Skills' },
  { path: '/admin/certificates', icon: HiAcademicCap, label: 'Certificates' },
  { path: '/admin/services', icon: HiBriefcase, label: 'Services' },
  { path: '/admin/experience', icon: HiHome, label: 'Experience' },
  { path: '/admin/settings', icon: HiCog, label: 'Settings' },
];

export default function AdminLayout() {
  const { admin, loading, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!admin) return <Navigate to="/admin/login" replace />;

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-white/5">
        <Link to="/admin" className="text-xl font-bold text-white">
          Admin<span className="text-gray-500">.</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {sidebarLinks.map(({ path, icon: Icon, label, exact }) => {
          const active = exact ? location.pathname === path : location.pathname.startsWith(path);
          return (
            <Link
              key={path}
              to={path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                active ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <Link
          to="/"
          onClick={() => setSidebarOpen(false)}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all mb-1"
        >
          <HiArrowLeft size={18} /> Back to Site
        </Link>
        <button
          onClick={() => { logout(); setSidebarOpen(false); }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all w-full"
        >
          <HiLogout size={18} /> Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <Link to="/admin" className="text-lg font-bold text-white">
          Admin<span className="text-gray-500">.</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          >
            <HiArrowLeft size={14} /> Home
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white text-2xl"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-black border-r border-white/5 min-h-screen fixed left-0 top-0 flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              className="fixed top-0 left-0 bottom-0 w-72 bg-black border-r border-white/5 z-50 flex flex-col lg:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 p-4 sm:p-6 lg:p-8">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}
