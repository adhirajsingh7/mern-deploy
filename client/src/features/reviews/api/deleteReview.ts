import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

type TReviewOptions = {
  handleClose: () => void;
  setPage: (value: number) => void;
};

export const deleteReview = (reviewId: string) => {
  return axios.delete(`/reviews/${reviewId}`);
};

export const useDeleteReview = (options: TReviewOptions) => {
  const { handleClose, setPage } = options;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: string) => deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      setPage(0);
      handleClose();
      toast.success("Review deleted successfully!");
    },
  });
};
