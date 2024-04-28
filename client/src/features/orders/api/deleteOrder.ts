import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

export const deleteOrder = (orderId: string) => {
  return axios.delete(`/orders/${orderId}`);
};

export const useDeleteOrder = (closeModal) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => deleteOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      closeModal();
      toast.success("Order deleted successfully!");
    },
  });
};
