import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleProductsNavigation = () => {
    navigate("/products");
  };
  return (
    <Stack
      sx={{ height: "calc(100vh - 64px)" }}
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <Typography variant="h4">Homepage</Typography>
      <Button variant="contained" onClick={handleProductsNavigation}>
        Show Products
      </Button>
    </Stack>
  );
};

export default HomePage;
