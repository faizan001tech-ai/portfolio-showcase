import { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';
import GlassCard from '../components/GlassCard';
import SectionTitle from '../components/SectionTitle';
import LoadingSkeleton from '../components/LoadingSkeleton';
import api from '../services/api';

export default function AIProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get('/projects', { params: { category: 'ai', search, sort, page, limit: 9 } })
      .then((r) => {
        setProjects(r.data.data.projects);
        setTotalPages(r.data.data.pages);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [search, sort, page]);

  return (
    <PageTransition>
      <SEO title="AI Projects" description="AI projects demonstrating intelligent applications and machine learning experiences" path="/ai-projects" />
      <section className="min-h-screen py-24 sm:py-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="AI Projects" subtitle="Intelligent applications and machine learning experiences" />

          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/20"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/20"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          {loading ? (
            <LoadingSkeleton count={6} />
          ) : projects.length === 0 ? (
            <p className="text-center text-gray-500">No projects found.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((p) => (
                  <GlassCard key={p._id} className="!p-0 overflow-hidden group cursor-pointer" onClick={() => setSelected(p)}>
                    <div className="h-48 bg-white/5 relative overflow-hidden">
                      {p.image ? (
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">No Image</div>
                      )}
                      {p.featured && (
                        <span className="absolute top-3 right-3 text-xs bg-white/10 backdrop-blur px-2 py-1 rounded-full text-white">Featured</span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-white mb-2">{p.title}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-3">{p.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {p.techStack?.slice(0, 4).map((t) => (
                          <span key={t} className="text-[10px] px-2 py-1 bg-white/5 rounded-full text-gray-400">{t}</span>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-10 h-10 rounded-lg text-sm transition-colors ${
                        page === i + 1 ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          <AnimatePresence>
            {selected && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelected(null)}
              >
                <motion.div
                  className="glass rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 relative"
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <HiX size={24} />
                  </button>
                  {selected.image && <img src={selected.image} alt={selected.title} className="w-full h-56 object-cover rounded-xl mb-4" />}
                  <h2 className="text-2xl font-bold text-white mb-2">{selected.title}</h2>
                  <p className="text-gray-400 mb-4">{selected.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selected.techStack?.map((t) => (
                      <span key={t} className="text-xs px-3 py-1 bg-white/5 rounded-full text-gray-300">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {selected.githubUrl && (
                      <a href={selected.githubUrl} rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-sm hover:bg-white/10 transition-colors">
                        <FaGithub /> GitHub
                      </a>
                    )}
                    {selected.liveUrl && (
                      <a href={selected.liveUrl} rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm hover:bg-gray-200 transition-colors">
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageTransition>
  );
}
