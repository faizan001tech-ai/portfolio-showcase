import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';
import GlassCard from '../components/GlassCard';
import SectionTitle from '../components/SectionTitle';

export default function Resume() {
  return (
    <PageTransition>
      <SEO title="Resume" description="Muhammad Faizan - Resume" path="/resume" />

      <section className="min-h-screen py-24 sm:py-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-10">
          <SectionTitle title="Resume" subtitle="Professional profile and experience" />

          <GlassCard>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white"> Faizan jahangir</h2>
              <p className="text-gray-400">faizan001.tech@gmail.com | +92 314 9884870 | github.com/faizan001 | linkedin.com/in/faizan001</p>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Summary</h3>
              <p className="text-gray-400 leading-relaxed">
                Motivated MERN Stack Developer with hands-on experience in developing responsive full-stack web applications.
                Completed a 15-month MERN Stack Development Course from SMIT Peshawar. Skilled in modern JavaScript
                technologies and eager to begin a professional career through a MERN Stack internship.
              </p>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Education</h3>
              <div className="space-y-2 text-gray-400">
                <p className="font-semibold text-white">F.Sc </p>
                <p>SMIT Peshawar</p>
                <p className="text-sm text-gray-500">MERN Stack Development Course (15 Months)</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Experience</h3>
              <div className="space-y-4 text-gray-400">
                <div>
                  <p className="font-semibold text-white">MERN Stack Trainee</p>
                  <p className="text-sm text-gray-500">SMIT Peshawar</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Completed 15 months of practical MERN Stack training.</li>
                    <li>Developed multiple frontend and full-stack projects.</li>
                    <li>Worked with REST APIs, Git/GitHub, authentication, CRUD operations, and responsive web design.</li>
                  </ul>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Projects</h3>
              <div className="space-y-4 text-gray-400">
                <div>
                  <p className="font-semibold text-white">E-Commerce Website</p>
                  <p className="text-sm text-gray-500">Built a full-stack MERN e-commerce application.</p>
                  <p className="text-sm">Implemented authentication, product management, shopping cart, and REST APIs.</p>
                  <p className="text-sm">Designed a responsive user interface with MongoDB integration.</p>
                </div>
                <div>
                  <p className="font-semibold text-white">QR Code Generator</p>
                  <p className="text-sm text-gray-500">Developed a responsive application to generate QR codes instantly from user input using JavaScript.</p>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Technical Skills</h3>
              <div className="grid gap-4 sm:grid-cols-2 text-gray-400">
                <div>
                  <p className="font-semibold text-white">Frontend</p>
                  <p>HTML5, CSS3, Bootstrap 5, Tailwind CSS, Material UI, React.js</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Programming</p>
                  <p>JavaScript (ES6+), TypeScript</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Backend</p>
                  <p>Node.js, Express.js</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Database</p>
                  <p>MongoDB</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Tools</p>
                  <p>Git, GitHub, VS Code, Postman, MongoDB Atlas</p>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Achievements</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-400">
                <li>Completed 15-month MERN Stack Development Program.</li>
                <li>Developed multiple MERN Stack and frontend projects.</li>
                <li>Strong understanding of React.js, Node.js, Express.js, MongoDB, and JavaScript.</li>
                <li>Quick learner with excellent problem-solving and teamwork skills.</li>
              </ul>
            </div>
          </GlassCard>
        </div>
      </section>
    </PageTransition>
  );
}
