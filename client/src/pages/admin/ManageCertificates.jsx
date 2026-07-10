import { useState, useEffect } from 'react';
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi';
import api from '../../services/api';

const emptyForm = { title: '', issuer: '', date: '', image: '', url: '' };

export default function ManageCertificates() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetch = () => api.get('/certificates').then((r) => setItems(r.data.data.certificates)).catch(() => {});
  useEffect(() => { fetch(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) await api.put(`/certificates/${editId}`, form);
    else await api.post('/certificates', form);
    reset(); fetch();
  };

  const handleEdit = (item) => { setForm({ ...item, date: item.date?.split('T')[0] || '' }); setEditId(item._id); setShowModal(true); };
  const handleDel = async (id) => { if (!confirm('Delete?')) return; await api.delete(`/certificates/${id}`); fetch(); };
  const reset = () => { setForm(emptyForm); setEditId(null); setShowModal(false); };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Certificates</h1>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-xl text-sm font-medium hover:bg-gray-200"><HiPlus /> Add Certificate</button>
      </div>
      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-white/5"><th className="text-left p-4 text-gray-400 text-sm">Title</th><th className="text-left p-4 text-gray-400 text-sm">Issuer</th><th className="text-left p-4 text-gray-400 text-sm">Date</th><th className="text-right p-4 text-gray-400 text-sm">Actions</th></tr></thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="p-4 text-white text-sm">{item.title}</td>
                <td className="p-4 text-gray-400 text-sm">{item.issuer}</td>
                <td className="p-4 text-gray-400 text-sm">{new Date(item.date).toLocaleDateString()}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleEdit(item)} className="text-gray-400 hover:text-white mr-3"><HiPencil /></button>
                  <button onClick={() => handleDel(item._id)} className="text-gray-400 hover:text-red-400"><HiTrash /></button>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-gray-500">No certificates yet</td></tr>}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={reset}>
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 max-w-lg w-full space-y-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-white">{editId ? 'Edit' : 'Add'} Certificate</h2>
            <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none" />
            <input required placeholder="Issuer" value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none" />
            <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none" />
            <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none" />
            <input placeholder="Verification URL" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none" />
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
