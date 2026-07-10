import { useState, useEffect } from 'react';
import { HiFolder, HiLightBulb, HiAcademicCap, HiBriefcase } from 'react-icons/hi';
import api from '../../services/api';

const statCards = [
  { key: 'projects', label: 'Projects', icon: HiFolder, color: 'text-blue-400' },
  { key: 'skills', label: 'Skills', icon: HiLightBulb, color: 'text-green-400' },
  { key: 'certificates', label: 'Certificates', icon: HiAcademicCap, color: 'text-purple-400' },
  { key: 'services', label: 'Services', icon: HiBriefcase, color: 'text-orange-400' },
];

export default function Dashboard() {
  const [stats, setStats] = useState({ projects: 0, skills: 0, certificates: 0, services: 0 });

  useEffect(() => {
    api.get('/settings/stats').then((r) => setStats(r.data.data)).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map(({ key, label, icon: Icon, color }) => (
          <div key={key} className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Icon className={`text-2xl ${color}`} />
              <span className="text-3xl font-bold text-white">{stats[key] || 0}</span>
            </div>
            <p className="text-gray-400">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
