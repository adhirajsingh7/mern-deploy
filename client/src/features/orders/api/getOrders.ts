import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchOrders = async (options: any) => {
  const {
    page = 0,
    rowsPerPage: limit = 5,
    // sortProducts: sortBy = "",
  } = options || {};
  const { data } = await axios.get(`/orders?page=${page}&limit=${limit}`);
  return data;
};

export const useGetOrders = (options: any) => {
  const { page, rowsPerPage } = options;
  return useQuery({
    queryKey: ["orders", { page, rowsPerPage }],
    queryFn: () => fetchOrders({ page, rowsPerPage }),
  });
};
