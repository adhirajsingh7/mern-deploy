import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

export const addProductToCart = (product: any) => {
  return axios.post("/cart", product);
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedProduct) => addProductToCart(updatedProduct),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Product added to cart!");
    },
  });
};
