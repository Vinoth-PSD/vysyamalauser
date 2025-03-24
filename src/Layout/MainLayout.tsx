import { Outlet } from 'react-router-dom';
import { Header } from '../Components/Header';
import { Footer } from '../Components/Footer';

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
