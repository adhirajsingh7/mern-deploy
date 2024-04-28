import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchAddresses = async (options: any) => {
  const { page = 0, rowsPerPage: limit = 10 } = options || {};
  const { data } = await axios.get(`/addresses?page=${page}&limit=${limit}`);
  return data;
};

export const useGetAddresses = () => {
  return useQuery({
    queryKey: ["address"],
    queryFn: () => fetchAddresses({}),
  });
};
