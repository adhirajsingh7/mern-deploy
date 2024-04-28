import { ConfirmationDialog } from "@/components/Elements/ConfirmationDialog";
import { useUpdateOrder } from "@/features/orders/api/updateOrder";
import { Button } from "@mui/material";
import React from "react";

export const CancelOrder = (props: any) => {
  const { orderId } = props;
  const [open, setOpen] = React.useState(false);

  const { isPending, mutate: updateOrderMutation } = useUpdateOrder();

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    const orderStatus = {
      status: "cancelled",
    };
    updateOrderMutation({ orderId, orderStatus });
    handleClose();
  };

  const DeleteButton = () => {
    return (
      <Button
        color="inherit"
        sx={{ textTransform: "none" }}
        onClick={handleClickOpen}
      >
        Cancel
      </Button>
    );
  };

  return (
    <ConfirmationDialog
      title={"Cancel Order"}
      body={"Are you sure you want to cancel your order?"}
      noText={"No"}
      yesText={"Yes"}
      open={open}
      DeleteButton={<DeleteButton />}
      handleDelete={handleDelete}
      handleClose={handleClose}
      isPending={isPending}
    />
  );
};
