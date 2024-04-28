import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type TUsersOption = {
  page: number;
  rowsPerPage: number;
  debouncedSearch: string;
  status: string;
  role?: string;
};

export const fetchUsers = async (options: TUsersOption) => {
  const {
    page = 1,
    rowsPerPage: limit = 10,
    debouncedSearch: name = "",
    status = "",
    role = "merchant",
  } = options || {};
  const { data } = await axios.get(
    `/users?page=${page}&limit=${limit}&name=${name}&status=${status}&role=${role}`
  );
  return data;
};

export const useGetUsersList = (options: TUsersOption) => {
  const { page, rowsPerPage, debouncedSearch, status } = options;
  return useQuery({
    queryKey: ["users", { page, rowsPerPage, debouncedSearch, status }],
    queryFn: () =>
      fetchUsers({
        page,
        rowsPerPage,
        debouncedSearch,
        status,
      }),
  });
};
