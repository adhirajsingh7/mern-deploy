import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ProductCard = (product: IProduct) => {
  const navigate = useNavigate();

  const handleView = (id: string) => {
    navigate(`/product/${id}`);
  };
  return (
    <Stack
      direction="column"
      sx={{
        height: "350px",
        width: "300px",
        borderRadius: "25px",
        bgcolor: "white",
        border: "1px solid #dee0e3",
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onClick={() => handleView(product?._id)}
    >
      <img
        src={product.image}
        alt=""
        style={{
          maxHeight: "50%",
          width: "100%",
          overflow: "hidden",
          objectFit: "cover",
          borderRadius: "25px 25px 0 0",
        }}
      />
      <Stack direction="column" sx={{ p: 2 }} gap={1}>
        <Typography variant="h5" fontWeight={600}>
          {product.name}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            height: "50px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {product.description}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Typography variant="h4" fontWeight={600}>
            ${product.price}
          </Typography>
          <Button variant="contained" color="secondary">
            View Item
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
