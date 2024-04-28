import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

export const deleteProduct = (productId: string) => {
  return axios.delete(`/products/${productId}`);
};

export const useDeleteProduct = (setSearch, setPage) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully!");
      setSearch(""), setPage(0);
    },
  });
};
