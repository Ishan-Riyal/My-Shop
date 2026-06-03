import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

const MobileHeader = ({ userInfo, cartCount, closeMenu, onLogout }) => {
  const adminLinks = [
    { label: "Products", path: "/admin/productlist" },
    { label: "Orders", path: "/admin/orderlist" },
    { label: "Users", path: "/admin/userlist" },
  ];

  return (
    <nav className="md:hidden bg-white border-t flex flex-col p-6 space-y-6 shadow-xl animate-in slide-in-from-top duration-300">
      <Link
        to="/cart"
        onClick={closeMenu}
        className="flex items-center gap-2 text-lg text-gray-600 font-medium active:scale-95 transition-transform"
      >
        <AiOutlineShoppingCart /> Cart ({cartCount})
      </Link>

      {userInfo ? (
        <div className="border-t pt-4 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-sm text-gray-400 font-medium capitalize">
              {userInfo.name}
            </p>
            {userInfo.isAdmin && (
              <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase">
                Admin
              </span>
            )}
          </div>

          <Link
            to="/user/profile"
            onClick={closeMenu}
            className="block text-lg text-gray-700"
          >
            Profile
          </Link>
          <Link
            to="/user/myorders"
            onClick={closeMenu}
            className="block text-lg text-gray-700"
          >
            My Orders
          </Link>

          {userInfo.isAdmin && (
            <div className="bg-gray-50 p-4 rounded-xl space-y-3 border border-gray-100">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Admin Panel
              </p>
              {adminLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className="block text-md text-gray-700"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          <button
            onClick={() => {
              onLogout();
              closeMenu();
            }}
            className="w-full text-left text-lg text-red-600 font-bold pt-2 active:opacity-70"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          onClick={closeMenu}
          className="bg-blue-600 text-white py-3 rounded-xl font-bold text-center active:scale-[0.98] transition-all shadow-md"
        >
          Sign In
        </Link>
      )}
    </nav>
  );
};

export default MobileHeader;
