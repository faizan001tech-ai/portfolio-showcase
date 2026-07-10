import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', ...props }) {
  return (
    <motion.div
      className={`glass glass-hover rounded-2xl p-6 transition-all duration-300 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
