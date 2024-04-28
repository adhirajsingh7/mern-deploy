import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TReviewSchema } from "@/lib/type";
import { toast } from "react-toastify";
import axios from "axios";

type TReviewOptions = {
  reviewId: string;
  closeModal: () => void;
};

export const updateReview = (reviewId: string, review: TReviewSchema) => {
  return axios.put(`/reviews/${reviewId}`, review);
};

export const useUpdateReview = (options: TReviewOptions) => {
  const { reviewId, closeModal } = options;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedReview: TReviewSchema) =>
      updateReview(reviewId, updatedReview),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      closeModal();
      toast.success("Review updated successfully!");
    },
  });
};
