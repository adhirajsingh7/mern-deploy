import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const signupUser = (user: any) => {
  const formData = new FormData();
  formData.append("username", user.username);
  formData.append("email", user.email);
  formData.append("password", user.password);
  formData.append("full_name", user.full_name);
  formData.append("mobile", user.mobile);
  formData.append("role", user.role);
  formData.append("avatar", user.avatar[0] || "");
  // for(let data of formData) console.log(data)
  return axios.post("/users/signup", formData);
};

export const useSignupUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user) => signupUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User registered successfully!");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
};
