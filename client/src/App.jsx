import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Services from './pages/Services';
import FrontendProjects from './pages/FrontendProjects';
import FullStackProjects from './pages/FullStackProjects';
import Certificates from './pages/Certificates';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageProjects from './pages/admin/ManageProjects';
import ManageSkills from './pages/admin/ManageSkills';
import ManageCertificates from './pages/admin/ManageCertificates';
import ManageServices from './pages/admin/ManageServices';
import ManageExperience from './pages/admin/ManageExperience';
import Settings from './pages/admin/Settings';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/services" element={<Services />} />
          <Route path="/frontend-projects" element={<FrontendProjects />} />
          <Route path="/fullstack-projects" element={<FullStackProjects />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<ManageProjects />} />
          <Route path="skills" element={<ManageSkills />} />
          <Route path="certificates" element={<ManageCertificates />} />
          <Route path="services" element={<ManageServices />} />
          <Route path="experience" element={<ManageExperience />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
