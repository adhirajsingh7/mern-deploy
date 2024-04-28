import React from "react";
import { ModalComponent } from "@/components/Elements/Modal";
import { IconButton } from "@mui/material";
import { ReviewFormComponent } from "./ReviewForm.component";
import EditIcon from "@mui/icons-material/Edit";

export const UpdateReview = (review: any) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ModalButton = () => {
    return (
      <IconButton onClick={handleOpen}>
        <EditIcon />
      </IconButton>
    );
  };

  return (
    <>
      <ModalComponent
        open={open}
        handleClose={handleClose}
        ModalButton={<ModalButton />}
      >
        <ReviewFormComponent closeModal={handleClose} review={review} />
      </ModalComponent>
    </>
  );
};
