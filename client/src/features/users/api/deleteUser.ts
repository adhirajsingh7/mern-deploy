import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

export const deleteUser = (userId: string) => {
  return axios.delete(`/users/${userId}`);
};

export const useDeleteUser = (closeModal) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      closeModal();
      toast.success("User deleted successfully!");
    },
  });
};
