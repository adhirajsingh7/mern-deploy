import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

type TUserId = string;

type TUpdateUserOptions = {
  userId: TUserId;
  setError?: any;
  reset?: () => void;
};

export const updateUser = (userId: string, user: any) => {
  const formData = new FormData();
  if (user.username) formData.append("username", user.username);
  if (user.email) formData.append("email", user.email);
  if (user.full_name) formData.append("full_name", user.full_name);
  if (user.mobile) formData.append("mobile", user.mobile);
  if (user.role) formData.append("role", user.role);
  if (user.avatar) formData.append("avatar", user.avatar[0] || "");
  if (user.status) formData.append("status", user.status);

  if (user.new_password) {
    // password update
    formData.append("new_password", user.new_password);
    formData.append("previous_password", user.previous_password);
  }
  //   for (let data of formData) console.log(data);
  return axios.put(`/users/${userId}`, formData);
};

export const useUpdateUser = (options: TUpdateUserOptions) => {
  const { userId, setError, reset } = options;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedUser) => updateUser(userId, updatedUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      if (reset) reset();
      toast.success("User updated successfully!");
    },
    onError: (error) => {
      console.log("REACT QUERY ERROR", error);
      if (error.code === "ERR_BAD_REQUEST") {
        if (error.response.data.message === "Password is wrong") {
          setError("password", {
            type: "server",
            message: error.response.data.message,
          });
        }
        if (error.response.data.message === "Email alread in use") {
          setError("email", {
            type: "server",
            message: error.response.data.message,
          });
        }
      }
    },
  });
};
