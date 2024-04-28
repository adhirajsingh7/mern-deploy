import { useUserStore } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchCart = () => {
  return axios.get("/cart");
};

export const useGetCart = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchCart(),
    enabled: isLoggedIn,
  });
};
