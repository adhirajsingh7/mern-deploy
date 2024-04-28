import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchProducts = (options: any) => {
  const {
    page = 1,
    rowsPerPage: limit = 5,
    debouncedSearch: name = "",
    categories = [],
    sortProducts: sortBy = "",
  } = options || {};

  let categoriesFilter = "";
  categoriesFilter = categories.join(",");
  return axios.get(
    `/products?page=${page}&limit=${limit}&name=${name}&category=${categoriesFilter}&sortBy=${sortBy}`
  );
};

export const useGetProducts = (
  page: number,
  rowsPerPage: number,
  debouncedSearch: string,
  categories?: string[],
  sortProducts?: string
) => {
  return useQuery({
    queryKey: [
      "products",
      { page, rowsPerPage, debouncedSearch, categories, sortProducts },
    ],
    queryFn: () =>
      fetchProducts({
        page,
        rowsPerPage,
        debouncedSearch,
        categories,
        sortProducts,
      }),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });
};
