import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { TAddressSchema } from "@/lib/type";
import axios from "axios";

type TAddressOptions = {
  closeModal: () => void;
};

export const createAddress = (address: TAddressSchema) => {
  return axios.post("/addresses", address);
};

export const useCreateAddress = ({ closeModal }: TAddressOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (address: TAddressSchema) => createAddress(address),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
      closeModal();
      toast.success("Address added succesfully");
    },
  });
};
