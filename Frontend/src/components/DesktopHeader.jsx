import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

const DesktopHeader = ({ userInfo, cartCount, onLogout }) => {
  const adminLinks = [
    { label: "Manage Products", path: "/admin/productlist" },
    { label: "Manage Orders", path: "/admin/orderlist" },
    { label: "Manage Users", path: "/admin/userlist" },
  ];

  return (
    <nav className="hidden md:flex items-center space-x-8">
      <Link
        to="/cart"
        className="flex items-center gap-1 text-gray-600 hover:text-blue-600 font-medium transition-colors"
      >
        <AiOutlineShoppingCart className="text-xl" />
        <span>Cart</span>
        <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs font-bold">
          {cartCount}
        </span>
      </Link>

      {userInfo ? (
        <div className="relative group">
          <button className="flex items-center gap-2 text-gray-700 group-hover:text-blue-600 font-semibold capitalize py-2">
            <span>{userInfo.name}</span>
            {userInfo.isAdmin && (
              <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase">
                Admin
              </span>
            )}
            <span className="text-[10px] transition-transform group-hover:rotate-180">
              ▼
            </span>
          </button>

          <div className="absolute right-0 w-52 bg-white border border-gray-100 shadow-xl rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <Link
              to="/user/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
            >
              Profile
            </Link>
            <Link
              to="/user/myorders"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
            >
              My Orders
            </Link>

            {userInfo.isAdmin && (
              <div className="border-t border-gray-50 mt-2 pt-2">
                <p className="px-4 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Admin Panel
                </p>
                {adminLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            <button
              onClick={onLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 border-t border-gray-50 mt-2 hover:bg-red-50 font-bold"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <Link
          to="/login"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          Sign In
        </Link>
      )}
    </nav>
  );
};

export default DesktopHeader;
