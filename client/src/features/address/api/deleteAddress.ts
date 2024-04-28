import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

type TAddressOptions = {
  handleClose: () => void;
};

export const deleteAddress = (addressId: string) => {
  return axios.delete(`/addresses/${addressId}`);
};

export const useDeleteAddress = ({ handleClose }: TAddressOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (addressId: string) => deleteAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
      handleClose();
      toast.success("Address deleted succesfully");
    },
  });
};
