import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const updateOrder = (orderId: string, order: any) => {
  return axios.put(`/orders/${orderId}`, order);
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, orderStatus }) => updateOrder(orderId, orderStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      toast.success("Order cancelled successfully!");
    },
  });
};
