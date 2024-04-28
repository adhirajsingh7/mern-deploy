import { useUserStore } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchUser = () => {
  return axios.get("/login/success");
};

export const useGetUser = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUser(),
    enabled: isLoggedIn,
    staleTime: 2 * 60 * 1000,
  });
};
