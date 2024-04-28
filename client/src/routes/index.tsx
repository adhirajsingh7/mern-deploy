import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

import { DashboardLayout, NavbarLayout } from "@/layout";
import { ProtectedRoute } from "@/utils/ProtectedRoute";
const CartPage = lazy(() => import("@/pages/Cart/CartPage"));
const AddressPage = lazy(() => import("@/pages/Dashboard/AddressPage"));
const MerchantsPage = lazy(() => import("@/pages/Dashboard/MerchantsPage"));
const OrdersPage = lazy(() => import("@/pages/Dashboard/OrdersPage"));
const ProfilePage = lazy(() => import("@/pages/Dashboard/ProfilePage"));
const SellProductsPage = lazy(
  () => import("@/pages/Dashboard/SellProductsPage")
);
const HomePage = lazy(() => import("@/pages/Home/HomePage"));
const LoginPage = lazy(() => import("@/pages/Login/LoginPage"));
const ProductDetailsPage = lazy(
  () => import("@/pages/Products/ProductDetailsPage")
);
const ProductsPage = lazy(() => import("@/pages/Products/ProductsPage"));
const SignupPage = lazy(() => import("@/pages/Signup/SignupPage"));

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <NavbarLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/product/:product_id",
        element: <ProductDetailsPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "addresses",
            element: <AddressPage />,
          },
          {
            path: "account",
            element: <ProfilePage />,
          },
          {
            path: "merchants",
            element: <MerchantsPage />,
          },
          {
            path: "view-orders",
            element: <OrdersPage />,
          },
          {
            path: "sell-products",
            element: <SellProductsPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
