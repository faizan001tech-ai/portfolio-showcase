import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export default function Settings() {
  const { admin, updateAdmin } = useAuth();
  const [profile, setProfile] = useState({ name: '', bio: '', title: '', avatar: '', resumeUrl: '', socialLinks: { github: '', linkedin: '', twitter: '', fiverr: '' } });
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (admin) {
      setProfile({
        name: admin.name || '', bio: admin.bio || '', title: admin.title || '',
        avatar: admin.avatar || '', resumeUrl: admin.resumeUrl || '',
        socialLinks: admin.socialLinks || { github: '', linkedin: '', twitter: '', fiverr: '' },
      });
    }
  }, [admin]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put('/settings/profile', profile);
      updateAdmin(res.data.data.admin);
      setMsg('Profile updated!');
    } catch { setMsg('Update failed'); }
    setTimeout(() => setMsg(''), 3000);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await api.put('/auth/change-password', passwords);
      setPasswords({ currentPassword: '', newPassword: '' });
      setMsg('Password changed!');
    } catch (err) { setMsg(err.response?.data?.message || 'Failed'); }
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>
      {msg && <div className="mb-6 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300">{msg}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile */}
        <form onSubmit={handleProfileUpdate} className="glass rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">Profile</h2>
          <input placeholder="Name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none" />
          <input placeholder="Title" value={profile.title} onChange={(e) => setProfile({ ...profile, title: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none" />
          <textarea placeholder="Bio" rows={3} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none resize-none" />
          <input placeholder="Avatar URL" value={profile.avatar} onChange={(e) => setProfile({ ...profile, avatar: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none" />
          <input placeholder="Resume URL" value={profile.resumeUrl} onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none" />
          <h3 className="text-sm font-semibold text-gray-400 pt-2">Social Links</h3>
          {['github', 'linkedin', 'twitter', 'fiverr'].map((key) => (
            <input key={key} placeholder={key} value={profile.socialLinks[key] || ''} onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, [key]: e.target.value } })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none" />
          ))}
          <button type="submit" className="w-full py-2 bg-white text-black rounded-xl font-medium hover:bg-gray-200">Save Profile</button>
        </form>

        {/* Password */}
        <form onSubmit={handlePasswordChange} className="glass rounded-2xl p-6 space-y-4 h-fit">
          <h2 className="text-xl font-bold text-white mb-4">Change Password</h2>
          <input type="password" placeholder="Current Password" required value={passwords.currentPassword} onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none" />
          <input type="password" placeholder="New Password" required value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none" />
          <button type="submit" className="w-full py-2 bg-white text-black rounded-xl font-medium hover:bg-gray-200">Change Password</button>
        </form>
      </div>
    </div>
  );
}
