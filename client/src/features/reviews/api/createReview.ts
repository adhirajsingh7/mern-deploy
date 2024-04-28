import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

export const createReview = (productId: string, review: IReview) => {
  return axios.post(`/reviews/${productId}`, review);
};

export const useCreateReview = (options: any) => {
  const { productId, closeModal } = options;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (review: IReview) => createReview(productId, review),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      closeModal();
      toast.success("Review created successfully!");
    },
  });
};
