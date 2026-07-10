import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/5 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold">F</span>
              Faizan
            </h3>
            <p className="text-gray-400 text-sm">MERN Stack Developer building modern web applications.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Quick Links</h4>
            <div className="space-y-2">
              {['/about', '/skills', '/frontend-projects', '/contact'].map((path) => (
                <Link key={path} to={path} className="block text-gray-400 text-sm hover:text-white transition-colors">
                  {path.replace('/', '').replace('-', ' ')}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Connect</h4>
            <div className="flex gap-4">
              {[
                { icon: FaGithub, href: 'https://github.com', label: 'GitHub' },
                { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 text-center">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-1">
            &copy; {year} Faizan. Made with <FaHeart className="text-red-500 text-xs" /> using MERN Stack
          </p>
        </div>
      </div>
    </footer>
  );
}
