import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, FormHelperText, Stack, Typography } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { useCreateAddress } from "@/features/address/api/createAddress";
import { useUpdateAddress } from "@/features/address/api/updateAddress";
import { TAddressSchema, addressSchema } from "@/lib/type";
import { address_type_options } from "@/lib/constants";
import { FormInputRadio, FormInputText } from "../Form";

interface propTypes {
  address?: IAddress;
  closeModal: () => void;
}

export const AddressFormComponent = (props: propTypes) => {
  const { address, closeModal } = props;

  const { isPending, mutate: createAddressMutation } = useCreateAddress({
    closeModal,
  });

  const { isPending: isUpdatePending, mutate: updateAddressMutation } =
    useUpdateAddress({ addressId: address?._id, closeModal });

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<TAddressSchema>({
    defaultValues: address
      ? address
      : {
          name: "",
          phone: "",
          pincode: "",
          city: "",
          state: "",
          country: "",
          locality: "",
          flat_no: "",
          landmark: "",
          address_type: "home",
        },
    resolver: zodResolver(addressSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (address) {
      updateAddressMutation(data);
    } else {
      createAddressMutation(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" gap={2} sx={{ minWidth: "600px" }}>
        <Typography variant="h4">{address ? "Edit" : "Add"} address</Typography>
        <Stack direction="column" gap={2}>
          <Typography variant="h6">Contact Info</Typography>
          <Stack direction="row" gap={2}>
            <FormInputText
              type="text"
              name={"name"}
              control={control}
              label={"Name"}
            />
            <FormInputText
              type="number"
              name={"phone"}
              control={control}
              label={"Phone"}
            />
          </Stack>
        </Stack>
        <Stack direction="column" gap={2}>
          <Typography variant="h6">Address Info</Typography>
          <Box sx={{ width: "200px" }}>
            <FormInputText
              type="number"
              name={"pincode"}
              control={control}
              label={"Pincode"}
            />
          </Box>
          <Stack direction="row" gap={2}>
            <FormInputText
              type="text"
              name={"city"}
              control={control}
              label={"City"}
            />
            <FormInputText
              type="text"
              name={"state"}
              control={control}
              label={"State"}
            />
            <FormInputText
              type="text"
              name={"country"}
              control={control}
              label={"Country"}
            />
          </Stack>
          <Stack direction="column" gap={3} mt={2}>
            <FormInputText
              type="text"
              name={"locality"}
              control={control}
              label={"Locality/Area/Street"}
            />
            <FormInputText
              type="text"
              name={"flat_no"}
              control={control}
              label={"Flat no/Building Name"}
            />
          </Stack>
        </Stack>
        <Box>
          <FormInputText
            type="text"
            name={"landmark"}
            control={control}
            label={"Landmark"}
          />
          <FormHelperText sx={{ ml: 1 }}>optional</FormHelperText>
        </Box>
        <Stack direction="column" gap={2}>
          <FormInputRadio
            name={"address_type"}
            control={control}
            label={"Type of Address"}
            options={address_type_options}
            error={errors.address_type}
          />
        </Stack>
        <Stack direction="row" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" onClick={() => closeModal()}>
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            loading={isPending || isUpdatePending}
            loadingPosition="center"
            variant="contained"
          >
            <span>{address ? "Edit" : "Create"}</span>
          </LoadingButton>
        </Stack>
      </Stack>
    </form>
  );
};
