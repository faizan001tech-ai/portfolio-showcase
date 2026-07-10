import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';
import GlassCard from '../components/GlassCard';
import SectionTitle from '../components/SectionTitle';
import api from '../services/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post('/contact', form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setSending(false);
      setTimeout(() => setStatus(null), 3000);
    }
  };

  return (
    <PageTransition>
      <SEO title="Contact" description="Get in touch with me for projects and collaborations" path="/contact" />
      <section className="min-h-screen py-24 sm:py-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <SectionTitle title="Contact" subtitle="Let's work together" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GlassCard>
              <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/20"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/20"
                />
                <textarea
                  placeholder="Your Message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/20 resize-none"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  <FaPaperPlane /> {sending ? 'Sending...' : 'Send Message'}
                </button>
                {status === 'success' && <p className="text-green-400 text-sm text-center">Message sent successfully!</p>}
                {status === 'error' && <p className="text-red-400 text-sm text-center">Failed to send. Please try again.</p>}
              </form>
            </GlassCard>

            <div className="space-y-6">
              <GlassCard>
                <h3 className="text-xl font-bold text-white mb-4">Contact Info</h3>
                <div className="space-y-3">
                  <a href="mailto:admin@portfolio.dev" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                    <FaEnvelope className="text-lg" /> admin@portfolio.dev
                  </a>
                  <a href="https://github.com" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                    <FaGithub className="text-lg" /> GitHub
                  </a>
                  <a href="https://linkedin.com" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                    <FaLinkedin className="text-lg" /> LinkedIn
                  </a>
                </div>
              </GlassCard>
              <GlassCard>
                <h3 className="text-xl font-bold text-white mb-2">Available for Work</h3>
                <p className="text-gray-400 text-sm">I'm currently available for freelance projects and full-time opportunities. Let's build something great together!</p>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
