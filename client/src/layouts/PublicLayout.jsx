import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingBoxes from '../components/FloatingBoxes';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <FloatingBoxes />
      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
