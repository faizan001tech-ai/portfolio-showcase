import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaCode, FaServer, FaBrain, FaPalette, FaDatabase, FaWrench, FaBook, FaCog, FaExternalLinkAlt } from 'react-icons/fa';
import { SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiTailwindcss, SiHtml5, SiCss, SiVite, SiExpress, SiMongodb, SiGit, SiGithub, SiVercel, SiNetlify, SiPostman, SiGraphql, SiDocker, SiSupabase } from 'react-icons/si';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';
import GlassCard from '../components/GlassCard';
import SectionTitle from '../components/SectionTitle';
import api from '../services/api';

const filterTags = [
  { label: 'Frontend', icon: FaCode },
  { label: 'Backend', icon: FaServer },
  { label: 'Database', icon: FaDatabase },
  { label: 'AI / ML', icon: FaBrain },
  { label: 'UI/UX', icon: FaPalette },
];

const floatingLogos = [
  { Icon: SiReact, color: '#61DAFB', pos: 'top-20 left-6 md:top-24 md:left-16', size: 28, delay: 0, glow: true },
  { Icon: SiNextdotjs, color: '#ffffff', pos: 'top-14 right-6 md:top-20 md:right-24', size: 26, delay: 0.3, glow: true },
  { Icon: SiTypescript, color: '#3178C6', pos: 'top-1/2 left-4 md:top-1/2 md:left-6 -translate-y-1/2', size: 24, delay: 0.6, glow: true },
  { Icon: SiNodedotjs, color: '#339933', pos: 'top-1/2 right-4 md:top-1/2 md:right-10 -translate-y-1/2', size: 26, delay: 0.9, glow: true },
  { Icon: SiMongodb, color: '#47A248', pos: 'bottom-16 right-8 md:bottom-24 md:right-20', size: 24, delay: 1.2, glow: true },
  { Icon: SiTailwindcss, color: '#06B6D4', pos: 'bottom-20 left-10 md:bottom-28 md:left-24', size: 22, delay: 1.5, glow: false },
];

const projectCategories = [
  {
    title: 'Frontend Projects',
    count: 'projects',
    key: 'frontend',
    icon: FaCode,
    image: '/digital-agency.png',
    description: 'UI/UX focused applications, design systems, and complex client-side state management.',
  },
  {
    title: 'Fullstack Projects',
    count: 'projects',
    key: 'fullstack',
    icon: FaServer,
    image: '/soel-soft.png',
    description: 'End-to-end applications with database design, API development, and authentication.',
  },
  {
    title: 'AI Projects',
    count: 'projects',
    key: 'ai',
    icon: FaBrain,
    image: '/dashboard.png',
    description: 'Intelligent applications powered by LLMs, RAG pipelines, vector databases, and modern AI tooling.',
  },
];

const techArsenal = [
  {
    title: 'Frontend',
    icon: FaPalette,
    tools: [
      { name: 'React', Icon: SiReact, color: 'text-cyan-400' },
      { name: 'Tailwind CSS', Icon: SiTailwindcss, color: 'text-cyan-300' },
      { name: 'HTML5', Icon: SiHtml5, color: 'text-orange-500' },
      { name: 'CSS3', Icon: SiCss, color: 'text-blue-500' },
      { name: 'Vite', Icon: SiVite, color: 'text-purple-400' },
      { name: 'Next.js', Icon: SiNextdotjs, color: 'text-white' },
    ],
  },
  {
    title: 'Backend & Database',
    icon: FaServer,
    tools: [
      { name: 'Node.js', Icon: SiNodedotjs, color: 'text-green-500' },
      { name: 'Express', Icon: SiExpress, color: 'text-gray-400' },
      { name: 'MongoDB', Icon: SiMongodb, color: 'text-green-600' },
      { name: 'REST API', Icon: FaCode, color: 'text-yellow-400' },
    ],
  },
  {
    title: 'Tools & Platforms',
    icon: FaWrench,
    tools: [
      { name: 'Git', Icon: SiGit, color: 'text-red-500' },
      { name: 'GitHub', Icon: SiGithub, color: 'text-white' },
      { name: 'Vercel', Icon: SiVercel, color: 'text-gray-300' },
      { name: 'Netlify', Icon: SiNetlify, color: 'text-teal-400' },
      { name: 'VS Code', Icon: FaCode, color: 'text-blue-500' },
      { name: 'Postman', Icon: SiPostman, color: 'text-orange-500' },
    ],
  },
  {
    title: 'Currently Learning',
    icon: FaBook,
    tools: [
      { name: 'TypeScript', Icon: SiTypescript, color: 'text-blue-500' },
      { name: 'GraphQL', Icon: SiGraphql, color: 'text-pink-500' },
      { name: 'Docker', Icon: SiDocker, color: 'text-blue-400' },
    ],
  },
  {
    title: 'AI & ML',
    icon: FaCog,
    tools: [
      { name: 'Supabase', Icon: SiSupabase, color: 'text-green-400' },
      { name: 'Vector DB', Icon: FaDatabase, color: 'text-purple-400' },
      { name: 'RAG', Icon: FaBrain, color: 'text-yellow-400' },
    ],
  },
];

export default function Home() {
  const [stats, setStats] = useState({ projects: 0, skills: 0, certificates: 0 });

  useEffect(() => {
    api.get('/settings/stats').then((r) => setStats(r.data.data)).catch(() => {});
  }, []);

  return (
    <PageTransition>
      <SEO title="Home" description="Faizan - MERN Stack Developer Portfolio" path="/" />

      {/* Hero Section */}
      <section className="min-h-[40vh] sm:min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20 sm:pt-24 pb-12 relative overflow-hidden">
        {/* Floating Tech Logos */}
        {floatingLogos.map(({ Icon, color, pos, size, delay, glow }, i) => (
          <motion.div
            key={i}
            className={`absolute ${pos}`}
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 0.6, scale: 1, rotate: 0 }}
            transition={{ delay, duration: 0.8, type: 'spring' }}
            whileHover={{ scale: 1.2, opacity: 1 }}
          >
            <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-black/80 border border-white/20 flex items-center justify-center backdrop-blur-md ${glow ? 'shadow-lg' : ''}`} style={glow ? { boxShadow: `0 0 30px ${color}30, 0 0 60px ${color}15, inset 0 0 20px ${color}10` } : { boxShadow: '0 0 20px rgba(255,255,255,0.05)' }}>
              <Icon style={{ color }} size={size * 0.8} className="sm:hidden" />
              <Icon style={{ color }} size={size} className="hidden sm:block" />
            </div>
          </motion.div>
        ))}

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-sm text-gray-300">MERN Stack Developer</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="text-3xl sm:text-5xl md:text-7xl font-bold text-center mb-4 leading-tight px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          All My Projects In{' '}
          <span className="text-orange-500">One Place</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-gray-400 text-center max-w-xl mb-6 sm:mb-8 text-sm sm:text-base px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          A curated collection of my frontend and full-stack applications, featuring modern UI/UX,
          scalable architectures, and clean code.
        </motion.p>

        {/* Filter Tags */}
        <motion.div
          className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-6 sm:mb-8 px-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {filterTags.map(({ label, icon: Icon }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs sm:text-sm text-gray-300 hover:bg-white/[0.08] transition-colors cursor-pointer"
            >
              <Icon size={14} /> {label}
            </span>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-wrap gap-3 sm:gap-4 justify-center px-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            to="/frontend-projects"
            className="flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-200 transition-colors text-sm sm:text-base"
          >
            <FaExternalLinkAlt size={14} /> View Projects
          </Link>
          <a
            href="https://github.com"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-white/[0.06] border border-white/[0.1] text-white rounded-xl font-medium hover:bg-white/[0.1] transition-colors text-sm sm:text-base"
          >
            <FaGithub size={18} /> GitHub
          </a>
        </motion.div>
      </section>

      {/* Project Categories Section */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.p
            className="text-xs uppercase tracking-[0.3em] text-gray-500 text-center mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Project Categories
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projectCategories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={cat.key === 'frontend' ? '/frontend-projects' : cat.key === 'fullstack' ? '/fullstack-projects' : '/services'}
                  className="block glass rounded-2xl overflow-hidden hover:bg-white/[0.06] transition-all group h-full"
                >
                  {/* Category Preview Image */}
                  <div className="h-36 bg-white/[0.03] relative overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                        <cat.icon className="text-white" size={14} />
                      </div>
                      <span className="text-xs text-gray-300">{stats.projects} Projects</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white mb-2">{cat.title}</h3>
                    <p className="text-gray-500 text-sm mb-3">{cat.description}</p>
                    <span className="text-sm text-orange-400 group-hover:text-orange-300 transition-colors">
                      Explore Category →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Arsenal Section */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.p
            className="text-xs uppercase tracking-[0.3em] text-gray-500 text-center mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Technical Arsenal
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {techArsenal.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-5"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center">
                    <section.icon className="text-gray-400" size={16} />
                  </div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{section.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {section.tools.map(({ name, Icon, color }) => (
                    <span
                      key={name}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-gray-300 hover:bg-white/[0.08] transition-colors"
                    >
                      <Icon className={color} size={12} />
                      {name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
