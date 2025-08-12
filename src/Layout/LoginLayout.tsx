import { Outlet } from "react-router-dom";
import { LoginHeader } from "../Components/LoginHeader";
// import { LoginFooter } from "../Components/LoginFooter";
import { Footer } from '../Components/Footer';

const LoginLayout: React.FC = () => {
  return (
    <>
      <LoginHeader />
      <main>
        <Outlet />
      </main>
      <Footer />
      {/* <LoginFooter /> */}
    </>
  );
};

export default LoginLayout;
