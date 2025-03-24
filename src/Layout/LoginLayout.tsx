import { Outlet } from "react-router-dom";
import { LoginHeader } from "../Components/LoginHeader";
import { LoginFooter } from "../Components/LoginFooter";

const LoginLayout: React.FC = () => {
  return (
    <>
      <LoginHeader />
      <main>
        <Outlet />
      </main>
      <LoginFooter />
    </>
  );
};

export default LoginLayout;
