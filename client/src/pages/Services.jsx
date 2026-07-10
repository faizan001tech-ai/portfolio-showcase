import { useState, useEffect } from 'react';
import { FaCode, FaServer, FaPaintBrush, FaRocket } from 'react-icons/fa';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';
import GlassCard from '../components/GlassCard';
import SectionTitle from '../components/SectionTitle';
import LoadingSkeleton from '../components/LoadingSkeleton';
import api from '../services/api';

const iconMap = { FaCode, FaServer, FaPaintBrush, FaRocket };

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/services').then((r) => setServices(r.data.data.services)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <PageTransition>
      <SEO title="Services" description="Professional web development services I offer" path="/services" />

      <section className="min-h-screen py-24 sm:py-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle title="Services" subtitle="What I can build for you" />

          {loading ? (
            <LoadingSkeleton count={4} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, i) => {
                const IconComp = iconMap[service.icon] || FaCode;
                return (
                  <GlassCard key={service._id}>
                    <IconComp className="text-3xl text-gray-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-gray-400">{service.description}</p>
                  </GlassCard>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
