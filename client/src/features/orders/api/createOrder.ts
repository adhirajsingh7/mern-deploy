import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const createOrder = (order: any) => {
  return axios.post(`/orders/`, order);
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (order) => createOrder(order),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders", "cart", "products"],
      });
      navigate("/");
      toast.success("Order placed successfully!");
    },
  });
};
