import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <>
      <SEO title="404" description="Page not found" path="/404" />
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-black">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-[100px] sm:text-[120px] md:text-[200px] font-bold text-white/5 leading-none">404</h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-white -mt-8 sm:-mt-10 mb-4">Page Not Found</h2>
          <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            Go Home
          </Link>
        </motion.div>
      </div>
    </>
  );
}
