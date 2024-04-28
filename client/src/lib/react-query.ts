import { QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      console.log("REACT QUERY ERROR : ", error);
      if (error?.response?.data?.message) {
        toast.error(
          `Status: ${error?.response?.status} ${error?.response?.data?.message}`
        );
      } else {
        toast.error(`Something went wrong: ${error.message}`);
      }
    },
  }),
});
