import { ConfirmationDialog } from "@/components/Elements/ConfirmationDialog";
import { useDeleteUser } from "@/features/users/api/deleteUser";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export const DeleteMerchant = (props: any) => {
  const { userId } = props;
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { isPending, mutate: deleteUserMutation } = useDeleteUser(handleClose);

  const handleDelete = () => {
    deleteUserMutation(userId);
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
      title={"Remove Merchant"}
      body={"Are you sure you want to remove the merchant?"}
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
