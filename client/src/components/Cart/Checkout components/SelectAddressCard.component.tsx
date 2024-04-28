import React from "react";
import { Paper, Stack, Typography } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import "./SelectAddressCard.styles.scss";

type TAddressIcons = {
  [key: string]: React.ReactNode;
};

const addressIcons: TAddressIcons = {
  home: <HomeOutlinedIcon />,
  office: <WorkOutlineOutlinedIcon />,
  other: <PlaceOutlinedIcon />,
};

export const SelectAddressCardComponent = (props: any) => {
  const { address, selectedAddress, setSelectedAddress } = props;
  const {
    _id: addressId,
    name,
    phone,
    pincode,
    city,
    state,
    country,
    locality,
    flat_no,
    landmark,
    address_type,
  } = address;

  return (
    <Stack
      className={selectedAddress === addressId ? "selected-card" : ""}
      direction="column"
      sx={{ p: 2, width: "400px" }}
      component={Paper}
      gap={1}
      onClick={() => setSelectedAddress(addressId)}
    >
      <Stack direction="row" gap={2} alignItems="center">
        {addressIcons[address_type]}
        <Typography variant="body1">{name}</Typography>
      </Stack>
      <Typography variant="body2">
        {flat_no}, {landmark ? landmark + "," : ""} {locality}, {city}, {state},{" "}
        {country} - {pincode}
      </Typography>
      <Typography variant="body2">
        Phone: <span style={{ fontWeight: 600 }}>{phone}</span>
      </Typography>
    </Stack>
  );
};
