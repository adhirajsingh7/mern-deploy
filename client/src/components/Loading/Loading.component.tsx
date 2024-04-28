import React from "react";
import { Stack } from "@mui/material";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

export const Loading = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
      }}
    >
      <ClimbingBoxLoader size={50} color="#FE6D87" />
    </Stack>
  );
};
