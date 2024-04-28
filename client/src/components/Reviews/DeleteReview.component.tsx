import React, { useState } from "react";
import { ConfirmationDialog } from "@/components/Elements/ConfirmationDialog";
import { IconButton } from "@mui/material";
import { useDeleteReview } from "@/features/reviews/api/deleteReview";
import DeleteIcon from "@mui/icons-material/Delete";

export const DeleteReview = (props: any) => {
  const { reviewId, setPage } = props;
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteReview = useDeleteReview({ handleClose, setPage });

  const handleDelete = () => {
    deleteReview.mutate(reviewId);
  };

  const DeleteButton = () => {
    return (
      <IconButton onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
    );
  };

  return (
    <ConfirmationDialog
      title={"Delete Review"}
      body={"Are you sure you want to delete your review?"}
      noText={"No"}
      yesText={"Yes"}
      open={open}
      DeleteButton={<DeleteButton />}
      handleDelete={handleDelete}
      handleClose={handleClose}
      isPending={deleteReview.isPending}
    />
  );
};
