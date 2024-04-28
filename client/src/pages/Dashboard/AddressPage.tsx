import React from "react";
import { Stack, Typography } from "@mui/material";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { AddressCardComponent, CreateAddress } from "@/components/Address";
import { useGetAddresses } from "@/features/address/api/getAddresses";

const AddressPage = () => {
  const { isPending, data: addressList } = useGetAddresses();
  console.log(addressList);

  if (isPending) {
    return (
      <Stack justifyContent="center" alignItems="center" sx={{ height: 1 }}>
        <ClimbingBoxLoader color="#FE6D87" size={25} />
      </Stack>
    );
  }

  return (
    <Stack direction="column" sx={{ p: 2, width: 1, overflow: "auto" }} gap={2}>
      <Typography variant="h5">Addresses</Typography>
      <Stack direction="row" justifyContent="flex-end" sx={{ width: 1 }}>
        <CreateAddress />
      </Stack>
      <Stack direction="row" gap={4}>
        {addressList?.data.length > 0 ? (
          addressList?.data.map((address: any) => (
            <AddressCardComponent key={address._id} address={address} />
          ))
        ) : (
          <Typography variant="h5" textAlign="center" width={1}>
            No addresses found
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default AddressPage;
