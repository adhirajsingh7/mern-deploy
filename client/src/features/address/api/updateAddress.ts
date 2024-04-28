import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { TAddressSchema } from "@/lib/type";
import axios from "axios";

type TAddressId = string | undefined;

type TAddressOptions = {
  addressId: TAddressId;
  closeModal: () => void;
};

export const updateAddress = (
  addressId: TAddressId,
  address: TAddressSchema
) => {
  return axios.put(`/addresses/${addressId}`, address);
};

export const useUpdateAddress = (options: TAddressOptions) => {
  const { addressId, closeModal } = options;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedAddress: TAddressSchema) =>
      updateAddress(addressId, updatedAddress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
      closeModal();
      toast.success("Address updated succesfully");
    },
  });
};
