import { useState, useEffect } from 'react';
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi';
import api from '../../services/api';

const emptyForm = { company: '', role: '', duration: '', description: '', current: false };

export default function ManageExperience() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetch = () => api.get('/experiences').then((r) => setItems(r.data.data.experiences)).catch(() => {});
  useEffect(() => { fetch(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) await api.put(`/experiences/${editId}`, form);
    else await api.post('/experiences', form);
    reset(); fetch();
  };

  const handleEdit = (item) => { setForm(item); setEditId(item._id); setShowModal(true); };
  const handleDel = async (id) => { if (!confirm('Delete?')) return; await api.delete(`/experiences/${id}`); fetch(); };
  const reset = () => { setForm(emptyForm); setEditId(null); setShowModal(false); };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Experience</h1>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-xl text-sm font-medium hover:bg-gray-200"><HiPlus /> Add Experience</button>
      </div>
      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-white/5"><th className="text-left p-4 text-gray-400 text-sm">Company</th><th className="text-left p-4 text-gray-400 text-sm">Role</th><th className="text-left p-4 text-gray-400 text-sm">Duration</th><th className="text-right p-4 text-gray-400 text-sm">Actions</th></tr></thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="p-4 text-white text-sm">{item.company}</td>
                <td className="p-4 text-gray-400 text-sm">{item.role}</td>
                <td className="p-4 text-gray-400 text-sm">{item.duration}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleEdit(item)} className="text-gray-400 hover:text-white mr-3"><HiPencil /></button>
                  <button onClick={() => handleDel(item._id)} className="text-gray-400 hover:text-red-400"><HiTrash /></button>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-gray-500">No experiences yet</td></tr>}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={reset}>
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 max-w-lg w-full space-y-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-white">{editId ? 'Edit' : 'Add'} Experience</h2>
            <input required placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none" />
            <input required placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none" />
            <input required placeholder="Duration (e.g., 2023 - Present)" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none" />
            <textarea placeholder="Description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none resize-none" />
            <label className="flex items-center gap-2 text-gray-400 text-sm">
              <input type="checkbox" checked={form.current} onChange={(e) => setForm({ ...form, current: e.target.checked })} /> Currently working here
            </label>
            <div className="flex gap-3">
              <button type="submit" className="flex-1 py-2 bg-white text-black rounded-xl font-medium hover:bg-gray-200">{editId ? 'Update' : 'Create'}</button>
              <button type="button" onClick={reset} className="px-6 py-2 border border-white/10 rounded-xl text-gray-400 hover:text-white">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
