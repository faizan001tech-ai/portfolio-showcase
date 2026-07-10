import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';
import GlassCard from '../components/GlassCard';
import SectionTitle from '../components/SectionTitle';

export default function About() {
  return (
    <PageTransition>
      <SEO title="About" description="Learn about Muhammad Faizan, a passionate MERN Stack Developer" path="/about" />

      <section className="min-h-screen py-24 sm:py-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle title="About Me" subtitle="My journey and passion for web development" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GlassCard>
              <h3 className="text-2xl font-bold text-white mb-4">Who I Am</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                I am a passionate MERN Stack Developer with a strong foundation in building modern,
                scalable, and user-friendly web applications. I specialize in React.js, Node.js,
                Express.js, and MongoDB.
              </p>
              <p className="text-gray-400 leading-relaxed">
                My journey in web development started with curiosity and has evolved into a professional
                career building enterprise-level applications. I focus on writing clean, maintainable code
                and delivering exceptional user experiences.
              </p>
            </GlassCard>

            <GlassCard>
              <h3 className="text-2xl font-bold text-white mb-4">What I Do</h3>
              <ul className="space-y-3">
                {[
                  'Full Stack Web Development',
                  'Responsive UI/UX Implementation',
                  'RESTful API Design & Development',
                  'Database Architecture & Optimization',
                  'Cloud Deployment & CI/CD',
                  'Performance Optimization',
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-center gap-3 text-gray-400"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="w-2 h-2 rounded-full bg-white/30" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </GlassCard>
          </div>

          <GlassCard className="mt-8">
            <h3 className="text-2xl font-bold text-white mb-4">Education & Background</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white">Education</h4>
                <p className="text-gray-400 mt-2">Computer Science / Software Engineering</p>
                <p className="text-gray-500 text-sm">Focused on web technologies and software development</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">Focus Areas</h4>
                <p className="text-gray-400 mt-2">Modern JavaScript ecosystem, cloud computing, and DevOps practices</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </PageTransition>
  );
}
