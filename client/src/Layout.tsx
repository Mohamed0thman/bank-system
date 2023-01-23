import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Header, Spinners } from "./components";

const Layout = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Header />
      <Suspense fallback={<Spinners />}>
        <main>
          <Outlet />
        </main>
      </Suspense>
    </div>
  );
};

export default Layout;
