import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase } from 'react-icons/fa';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';
import GlassCard from '../components/GlassCard';
import SectionTitle from '../components/SectionTitle';
import LoadingSkeleton from '../components/LoadingSkeleton';
import api from '../services/api';

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/experiences').then((r) => setExperiences(r.data.data.experiences)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <PageTransition>
      <SEO title="Experience" description="Professional work experience and career journey" path="/experience" />
      <section className="min-h-screen py-24 sm:py-32 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <SectionTitle title="Experience" subtitle="My professional journey" />
          {loading ? <LoadingSkeleton count={3} type="list" /> : experiences.length === 0 ? (
            <p className="text-center text-gray-500">No experience entries yet.</p>
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-white/10" />
              <div className="space-y-6 sm:space-y-8">
                {experiences.map((exp, i) => (
                  <motion.div
                    key={exp._id}
                    className="relative pl-12 sm:pl-16"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="absolute left-1 sm:left-3 top-6 w-6 h-6 rounded-full border-2 border-white/20 bg-black flex items-center justify-center">
                      {exp.current && <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />}
                    </div>
                    <GlassCard>
                      <div className="flex items-start gap-3 mb-2">
                        <FaBriefcase className="text-gray-500 mt-1" />
                        <div>
                          <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                          <p className="text-gray-400">{exp.company}</p>
                          <p className="text-gray-500 text-sm">{exp.duration}</p>
                        </div>
                      </div>
                      {exp.description && <p className="text-gray-400 text-sm mt-3">{exp.description}</p>}
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
