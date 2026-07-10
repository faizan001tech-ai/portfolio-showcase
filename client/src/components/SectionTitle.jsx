import { motion } from 'framer-motion';

export default function SectionTitle({ title, subtitle }) {
  return (
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">{title}</h2>
      {subtitle && <p className="text-gray-400 text-lg max-w-xl mx-auto">{subtitle}</p>}
      <div className="w-20 h-1 bg-white/20 mx-auto mt-4 rounded-full" />
    </motion.div>
  );
}
