import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "@/features/auth/api/getUser";
import { useUserStore } from "@/store/store";

type ProtectedRouteProps = PropsWithChildren;

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const { isLoading, data: userData } = useGetUser();
  // console.log(userData)
  useEffect(() => {
    setUser(userData?.data?.user);
  }, [userData]);

  return !isLoading && children;
};
