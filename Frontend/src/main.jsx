import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import store from "./store.js";
import App from "./App.jsx";
import "./index.css";

import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ShippingPage from "./pages/ShippingPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import PlaceOrderPage from "./pages/PlaceOrderPage.jsx";
import OrderDetailsPage from "./pages/OrderDetailsPage.jsx";
import UserProfilePage from "./pages/UserProfilePage.jsx";
import UserOrdersPage from "./pages/UserOrdersPage.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminRoute from "./components/Admin/AdminRoute.jsx";

import AdminProductList from "./pages/Admin/AdminProductList.jsx";
import AdminOrderList from "./pages/Admin/AdminOrderList.jsx";
import AdminUserList from "./pages/Admin/AdminUserList.jsx";
import AdminEditProduct from "./pages/Admin/AdminEditProduct.jsx";
import AdminEditUser from "./pages/Admin/AdminEditUser.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="search/:keyword" element={<HomePage />} />
      <Route path="page/:pageNumber" element={<HomePage />} />
      <Route path="search/:keyword/page/:pageNumber" element={<HomePage />} />
      <Route path="product/:id" element={<ProductPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="shipping" element={<ShippingPage />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route path="placeorder" element={<PlaceOrderPage />} />
        <Route path="orders/:id" element={<OrderDetailsPage />} />
        <Route path="user/profile" element={<UserProfilePage />} />
        <Route path="user/myorders" element={<UserOrdersPage />} />
        <Route
          path="user/myorders/page/:pageNumber"
          element={<UserOrdersPage />}
        />
        <Route
          path="user/myorders/search/:keyword"
          element={<UserOrdersPage />}
        />
        <Route
          path="user/myorders/search/:keyword/page/:pageNumber"
          element={<UserOrdersPage />}
        />
      </Route>

      <Route path="admin" element={<AdminRoute />}>
        <Route path="productlist" element={<AdminProductList />} />
        <Route
          path="productlist/page/:pageNumber"
          element={<AdminProductList />}
        />
        <Route
          path="productlist/search/:keyword"
          element={<AdminProductList />}
        />
        <Route
          path="productlist/search/:keyword/page/:pageNumber"
          element={<AdminProductList />}
        />

        <Route path="orderlist" element={<AdminOrderList />} />
        <Route path="orderlist/page/:pageNumber" element={<AdminOrderList />} />
        <Route path="orderlist/search/:keyword" element={<AdminOrderList />} />
        <Route
          path="orderlist/search/:keyword/page/:pageNumber"
          element={<AdminOrderList />}
        />

        <Route path="userlist" element={<AdminUserList />} />
        <Route path="userlist/page/:pageNumber" element={<AdminUserList />} />
        <Route path="userlist/search/:keyword" element={<AdminUserList />} />
        <Route
          path="userlist/search/:keyword/page/:pageNumber"
          element={<AdminUserList />}
        />

        <Route path="product/:id/edit" element={<AdminEditProduct />} />
        <Route path="user/:id/edit" element={<AdminEditUser />} />
      </Route>
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </StrictMode>,
);
