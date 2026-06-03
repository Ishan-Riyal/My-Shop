import { Link } from "react-router-dom";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { useHeader } from "../hooks/useHeader";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

const Header = () => {
  const { isOpen, userInfo, cartCount, toggleMenu, closeMenu, handleLogout } =
    useHeader();

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" onClick={closeMenu} className="shrink-0">
          <img
            src="/logo.png"
            alt="myShop"
            className="h-9 w-auto hover:opacity-80 transition-opacity"
          />
        </Link>

        <DesktopHeader
          userInfo={userInfo}
          cartCount={cartCount}
          onLogout={handleLogout}
        />

        <button
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          className="md:hidden text-3xl text-gray-600 hover:text-blue-600 transition-colors"
        >
          {isOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden transition-all duration-300">
          <MobileHeader
            userInfo={userInfo}
            cartCount={cartCount}
            closeMenu={closeMenu}
            onLogout={handleLogout}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
