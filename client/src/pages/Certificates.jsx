import { useState, useEffect } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';
import GlassCard from '../components/GlassCard';
import SectionTitle from '../components/SectionTitle';
import LoadingSkeleton from '../components/LoadingSkeleton';
import api from '../services/api';

export default function Certificates() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/certificates').then((r) => setCerts(r.data.data.certificates)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <PageTransition>
      <SEO title="Certificates" description="Professional certifications and achievements" path="/certificates" />
      <section className="min-h-screen py-24 sm:py-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle title="Certificates" subtitle="Professional certifications and achievements" />
          {loading ? <LoadingSkeleton count={4} /> : certs.length === 0 ? (
            <p className="text-center text-gray-500">No certificates yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certs.map((c) => (
                <GlassCard key={c._id} className="!p-0 overflow-hidden group">
                  <div className="h-48 bg-white/5 relative overflow-hidden">
                    {c.image ? (
                      <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">Certificate</div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white mb-1">{c.title}</h3>
                    <p className="text-gray-400 text-sm mb-1">{c.issuer}</p>
                    <p className="text-gray-500 text-xs mb-3">{new Date(c.date).toLocaleDateString()}</p>
                    {c.url && (
                      <a href={c.url} rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors">
                        <FaExternalLinkAlt /> Verify
                      </a>
                    )}
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
