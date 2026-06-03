import { useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/userSlice";
import { logout } from "../slices/authSlice";
import { resetCart } from "../slices/cartSlice";

export const useHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [logoutCall] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  const handleLogout = async () => {
    try {
      await logoutCall().unwrap();
      dispatch(logout());
      closeMenu();
      dispatch(resetCart());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const cartCount = useMemo(
    () => cartItems.reduce((acc, item) => acc + (Number(item.qty) || 0), 0),
    [cartItems],
  );

  return { isOpen, userInfo, cartCount, toggleMenu, closeMenu, handleLogout };
};
