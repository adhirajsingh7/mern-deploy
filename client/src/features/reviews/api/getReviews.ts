import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type TReviewsFilter = {
  page: number;
  rowsPerPage: number;
  productId: string;
};

export const fetchReviews = async (options: TReviewsFilter) => {
  const { page = 0, rowsPerPage: limit = 10, productId = "" } = options || {};
  const { data } = await axios.get(
    `/reviews?page=${page}&limit=${limit}&product_id=${productId}`
  );
  return data;
};

export const useGetReviews = (options: TReviewsFilter) => {
  const { page, rowsPerPage, productId } = options;
  return useQuery({
    queryKey: ["reviews", { page, rowsPerPage }],
    queryFn: () => fetchReviews({ productId, page, rowsPerPage }),
  });
};
