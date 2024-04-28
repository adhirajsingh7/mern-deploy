import React from "react";
import { ModalComponent } from "@/components/Elements/Modal";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const ViewOrder = (props: any) => {
  const { order } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ModalButton = () => {
    return (
      <Tooltip title="View">
        <IconButton onClick={handleOpen}>
          <VisibilityIcon />
        </IconButton>
      </Tooltip>
    );
  };

  const DisplayOrder = () => {
    return (
      <Stack direction="column" gap={2}>
        <Typography variant="h5">Products</Typography>
        <Stack direction="row" gap={10} justifyContent="space-between">
          <Stack
            direction="row"
            gap={2}
            sx={{ width: "800px", overflow: "auto" }}
          >
            {order?.products?.map((product) => (
              <Stack
                key={product.product_id}
                direction="row"
                gap={2}
                sx={{ minWidth: "300px", border: "2px solid #dee0e3", p: 1 }}
              >
                <Stack direction="column" gap={1}>
                  <Typography variant="h5">{product.name}</Typography>
                  <img
                    src={product.image}
                    alt=""
                    style={{
                      height: "100px",
                      width: "100px",
                      objectFit: "cover",
                    }}
                  />
                </Stack>
                <Stack direction="column" gap={2}>
                  <Typography variant="body1">
                    category -
                    <span style={{ fontWeight: 600 }}> {product.category}</span>
                  </Typography>
                  <Typography variant="body1">
                    quantity -
                    <span style={{ fontWeight: 600 }}> {product.quantity}</span>
                  </Typography>
                  <Typography variant="body1">
                    subtotal -
                    <span style={{ fontWeight: 600 }}>
                      {" "}
                      ${product.total_price}
                    </span>
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>
          <Stack direction="column" gap={1}>
            <Typography>
              Status - <span style={{ fontWeight: 600 }}>{order.status}</span>
            </Typography>
            <Typography>
              Total amount -{" "}
              <span style={{ fontWeight: 600 }}>${order.total_amount}</span>
            </Typography>
            <Typography>Address - </Typography>
            <Typography variant="body2" fontWeight={600}>
              {order.destination.flat_no},{" "}
              {order.destination.landmark
                ? order.destination.landmark + ","
                : ""}{" "}
              {order.destination.locality}, {order.destination.city},{" "}
              {order.destination.state}, {order.destination.country} -{" "}
              {order.destination.pincode}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    );
  };

  return (
    <>
      <ModalComponent
        open={open}
        handleClose={handleClose}
        ModalButton={<ModalButton />}
      >
        <DisplayOrder />
      </ModalComponent>
    </>
  );
};
