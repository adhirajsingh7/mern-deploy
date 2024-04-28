import { useUserStore } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

export const logoutUser = () => {
  return axios.post("/logout");
};

export const useLogoutUser = () => {
  const setIsLoggedIn = useUserStore((state) => state.setIsLoggedIn);

  return useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      setIsLoggedIn(false);
      toast.success("Logged out successfully!");
    },
  });
};
