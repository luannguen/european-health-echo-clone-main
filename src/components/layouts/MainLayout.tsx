import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import BackToTop from '../BackToTop';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default MainLayout;