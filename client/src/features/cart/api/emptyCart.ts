import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const EmptyCart = (cartId: string) => {
  return axios.delete(`/cart/${cartId}`);
};

export const useEmptyCart = (cartId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => EmptyCart(cartId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      console.log(data);
    },
  });
};
