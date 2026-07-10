import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';
import GlassCard from '../components/GlassCard';
import SectionTitle from '../components/SectionTitle';
import LoadingSkeleton from '../components/LoadingSkeleton';
import api from '../services/api';

const categoryColors = {
  frontend: 'bg-blue-500/10 text-blue-400',
  backend: 'bg-green-500/10 text-green-400',
  tools: 'bg-purple-500/10 text-purple-400',
  database: 'bg-orange-500/10 text-orange-400',
};

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/skills').then((r) => setSkills(r.data.data.skills)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <PageTransition>
      <SEO title="Skills" description="Technical skills and technologies I work with" path="/skills" />

      <section className="min-h-screen py-24 sm:py-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle title="Skills" subtitle="Technologies and tools I specialize in" />

          {loading ? (
            <LoadingSkeleton count={6} />
          ) : (
            <div className="space-y-12">
              {categories.map((cat) => (
                <div key={cat}>
                  <h3 className="text-xl font-semibold text-white mb-6 capitalize">{cat}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skills
                      .filter((s) => s.category === cat)
                      .map((skill, i) => (
                        <GlassCard key={skill._id} className="!p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-white font-medium">{skill.name}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[cat] || 'bg-gray-500/10 text-gray-400'}`}>
                              {skill.level}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-white/20 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.1, duration: 0.8 }}
                            />
                          </div>
                        </GlassCard>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
