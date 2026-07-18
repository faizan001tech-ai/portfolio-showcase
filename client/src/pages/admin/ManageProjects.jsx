import { useState, useEffect, useRef } from 'react';
import { HiPlus, HiPencil, HiTrash, HiUpload, HiX, HiExternalLink } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';

const emptyForm = { title: '', description: '', techStack: '', image: '', githubUrl: '', liveUrl: '', category: 'frontend', featured: false };

export default function ManageProjects() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [filter, setFilter] = useState('all');
  const fileRef = useRef(null);

  const fetch = () => api.get('/projects', { params: { limit: 100 } }).then((r) => {
    if (r.data?.data?.projects) {
      setItems(r.data.data.projects);
    }
  }).catch(() => {});
  useEffect(() => { fetch(); }, []);

  const filteredItems = filter === 'all' ? items : items.filter(i => i.category === filter);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('category', form.category); // Send category for folder organization
    try {
      const res = await api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setForm({ ...form, image: res.data.imageUrl });
    } catch {
      alert('Upload failed');
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, techStack: form.techStack.split(',').map((s) => s.trim()).filter(Boolean) };
    if (editId) {
      await api.put(`/projects/${editId}`, data);
    } else {
      await api.post('/projects', data);
    }
    reset();
    fetch();
  };

  const handleEdit = (item) => {
    setForm({ ...item, techStack: item.techStack?.join(', ') || '' });
    setPreview(item.image ? (item.image.startsWith('http') ? item.image : `${api.defaults.baseURL || ''}${item.image}`) : null);
    setEditId(item._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    await api.delete(`/projects/${id}`);
    fetch();
  };

  const reset = () => { setForm(emptyForm); setEditId(null); setShowModal(false); setPreview(null); };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Manage Projects</h1>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20">
          <HiPlus size={18} /> Add Project
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', 'frontend', 'fullstack', 'ai', 'mini'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize ${
              filter === f ? 'bg-orange-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {f === 'all' ? `All (${items.length})` : `${f} (${items.filter(i => i.category === f).length})`}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              key={item._id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass rounded-2xl overflow-hidden group"
            >
              {/* Image */}
              <div className="h-36 bg-white/[0.03] relative overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">No Image</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-2 right-2 flex gap-1.5">
                  {item.featured && (
                    <span className="px-2 py-0.5 bg-orange-500/80 text-white text-xs rounded-full font-medium">Featured</span>
                  )}
                  <span className="px-2 py-0.5 bg-white/10 backdrop-blur-sm text-gray-300 text-xs rounded-full capitalize">{item.category}</span>
                </div>
                {item.liveUrl && (
                  <a href={item.liveUrl} rel="noreferrer" className="absolute bottom-2 right-2 w-7 h-7 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                    <HiExternalLink size={14} />
                  </a>
                )}
              </div>
              {/* Info */}
              <div className="p-4">
                <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                <p className="text-gray-500 text-xs line-clamp-2 mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {item.techStack?.map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-white/5 text-gray-400 text-xs rounded-full">{t}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <button onClick={() => handleEdit(item)} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                    <HiPencil size={14} /> Edit
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs text-gray-400 hover:text-red-400 bg-white/5 hover:bg-red-500/10 rounded-lg transition-colors">
                    <HiTrash size={14} /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {filteredItems.length === 0 && (
          <div className="col-span-full glass rounded-2xl p-12 text-center text-gray-500">No projects in this category</div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={reset}>
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">{editId ? 'Edit' : 'Add'} Project</h2>
              <button type="button" onClick={reset} className="text-gray-400 hover:text-white"><HiX size={22} /></button>
            </div>

            {/* Title */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Project Title *</label>
              <input required placeholder="e.g. E-Commerce Store" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50" />
            </div>

            {/* Description */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Description *</label>
              <textarea required placeholder="Describe what this project does..." rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 resize-none" />
            </div>

            {/* Tech Stack */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Tech Stack <span className="text-gray-600">(comma separated)</span></label>
              <input placeholder="React, Node.js, MongoDB, Tailwind CSS" value={form.techStack} onChange={(e) => setForm({ ...form, techStack: e.target.value })} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50" />
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Project Screenshot</label>
              {preview && (
                <div className="mb-2 rounded-xl overflow-hidden border border-white/10 relative">
                  <img src={preview} alt="Preview" className="w-full h-36 object-cover" />
                  <button type="button" onClick={() => { setPreview(null); setForm({ ...form, image: '' }); }} className="absolute top-2 right-2 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors">
                    <HiX size={14} />
                  </button>
                </div>
              )}
              <div className="flex gap-2">
                <input type="file" ref={fileRef} accept="image/*" onChange={handleFileChange} className="hidden" />
                <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-dashed border-white/20 rounded-xl text-gray-400 hover:text-white hover:border-orange-500/40 transition-colors text-sm disabled:opacity-50">
                  <HiUpload size={16} /> {uploading ? 'Uploading...' : 'Upload Image'}
                </button>
              </div>
              <input placeholder="Or paste image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full mt-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none text-sm" />
            </div>

            {/* URLs */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">GitHub URL</label>
                <input placeholder="https://github.com/..." value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Live Demo URL</label>
                <input placeholder="https://myapp.vercel.app" value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 text-sm" />
              </div>
            </div>

            {/* Category & Featured */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-500/50">
                  <option value="frontend">Frontend</option>
                  <option value="fullstack">Full Stack</option>
                  <option value="ai">AI</option>
                  <option value="mini">Mini</option>
                </select>
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer py-2.5">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 rounded accent-orange-500" />
                  Featured Project
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button type="submit" className="flex-1 py-2.5 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20">{editId ? 'Update Project' : 'Add Project'}</button>
              <button type="button" onClick={reset} className="px-6 py-2.5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors">Cancel</button>
            </div>
          </motion.form>
        </div>
      )}
    </div>
  );
}
