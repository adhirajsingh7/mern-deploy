import React from "react";
import { ConfirmationDialog } from "@/components/Elements/ConfirmationDialog";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteOrder } from "@/features/orders/api/deleteOrder";

export const DeleteOrder = (props: any) => {
  const { orderId } = props;
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { isPending, mutate: deleteOrderMutation } =
    useDeleteOrder(handleClose);

  const handleDelete = () => {
    deleteOrderMutation(orderId);
  };

  const DeleteButton = () => {
    return (
      <Tooltip title="Delete">
        <IconButton onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <ConfirmationDialog
      title={"Delete Order"}
      body={"Are you sure you want to delete this order?"}
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
