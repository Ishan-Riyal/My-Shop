import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <Footer />

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default App;
