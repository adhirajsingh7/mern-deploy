import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/store";
import axios from "axios";

export const loginUser = (user) => {
  return axios.post("/login/password", user);
};

export const useLoginUser = () => {
  const setIsLoggedIn = useUserStore((state) => state.setIsLoggedIn);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user) => loginUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      setIsLoggedIn(true);
      toast.success("Logged in successfully!");
      navigate("/");
    },
    onError: (error) => {
      if (error?.code === "ERR_BAD_REQUEST") {
        toast.error("Invalid credentials!");
      }
    },
  });
};
