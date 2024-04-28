import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const updateCart = (cartId: string, updatedProduct: any) => {
  return axios.put(`/cart/${cartId}`, updatedProduct);
};

export const useUpdateCart = (cartId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedProduct) => updateCart(cartId, updatedProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
