import * as React from "react";
import { Outlet } from "react-router-dom";
import { NavbarComponent } from "@/components/Navbar";
import { useGetCart } from "@/features/cart/api/getCart";

export const NavbarLayout = () => {
  const { data: userCart } = useGetCart();

  // console.log(userCart?.data[0]);

  return (
    <>
      <NavbarComponent userCart={userCart?.data[0]} />
      <Outlet context={userCart?.data[0]} />
    </>
  );
};
